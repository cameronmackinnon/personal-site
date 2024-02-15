/*
 * Utility functions to decode/encode numbers and array's of numbers
 * to/from strings (Google maps polyline encoding)
 *
 * Extends the L.Polyline and L.Polygon object with methods to convert
 * to and create from these strings.
 *
 * Jan Pieter Waagmeester <jieter@jieter.nl>
 *
 * Original code from:
 * http://facstaff.unca.edu/mcmcclur/GoogleMaps/EncodePolyline/
 * (which is down as of december 2014)
 */

(function () {

  const defaultOptions = function (originalOptions) {
    const options = typeof originalOptions === 'number' ? { precision: originalOptions } : { ...originalOptions };
    options.precision = options.precision || 5;
    options.factor = options.factor || 10 ** options.precision;
    options.dimension = options.dimension || 2;
    return options;
  };

  const PolylineUtil = {
    encode(points, options) {
      options = defaultOptions(options);

      const flatPoints = [];
      for (const i = 0, len = points.length; i < len; i += 1) {
        const point = points[i];

        if (options.dimension === 2) {
          flatPoints.push(point.lat || point[0]);
          flatPoints.push(point.lng || point[1]);
        } else {
          for (const dim = 0; dim < options.dimension; dim += 1) {
            flatPoints.push(point[dim]);
          }
        }
      }

      return this.encodeDeltas(flatPoints, options);
    },

    decode: function (encoded, options) {
      options = defaultOptions(options);

      const flatPoints = this.decodeDeltas(encoded, options);

      const points = [];
      for (const i = 0, len = flatPoints.length; i + (options.dimension - 1) < len;) {
        const point = [];

        for (const dim = 0; dim < options.dimension; dim += 1) {
          point.push(flatPoints[i += 1]);
        }

        points.push(point);
      }

      return points;
    },

    encodeDeltas: function (numbers, options) {
      options = defaultOptions(options);

      const lastNumbers = [];

      for (const i = 0, len = numbers.length; i < len;) {
        for (const d = 0; d < options.dimension; d += 1, i += 1) {
          const num = numbers[i].toFixed(options.precision);
          const delta = num - (lastNumbers[d] || 0);
          lastNumbers[d] = num;

          numbers[i] = delta;
        }
      }

      return this.encodeFloats(numbers, options);
    },

    decodeDeltas: function (encoded, options) {
      options = defaultOptions(options);

      const lastNumbers = [];

      const numbers = this.decodeFloats(encoded, options);
      for (const i = 0, len = numbers.length; i < len;) {
        for (const d = 0; d < options.dimension; d += 1, i += 1) {
          numbers[i] = Math.round((lastNumbers[d] = numbers[i] + (lastNumbers[d] || 0))
                        * options.factor) / options.factor;
        }
      }

      return numbers;
    },

    encodeFloats: function (numbers, options) {
      options = defaultOptions(options);

      for (const i = 0, len = numbers.length; i < len; i += 1) {
        numbers[i] = Math.round(numbers[i] * options.factor);
      }

      return this.encodeSignedIntegers(numbers);
    },

    decodeFloats: function (encoded, options) {
      options = defaultOptions(options);

      const numbers = this.decodeSignedIntegers(encoded);
      for (const i = 0, len = numbers.length; i < len; i += 1) {
        numbers[i] /= options.factor;
      }

      return numbers;
    },

    encodeSignedIntegers: function (numbers) {
      for (const i = 0, len = numbers.length; i < len; i += 1) {
        const num = numbers[i];
        numbers[i] = (num < 0) ? ~(num << 1) : (num << 1);
      }

      return this.encodeUnsignedIntegers(numbers);
    },

    decodeSignedIntegers: function (encoded) {
      const numbers = this.decodeUnsignedIntegers(encoded);

      for (const i = 0, len = numbers.length; i < len; i += 1) {
        const num = numbers[i];
        numbers[i] = (num & 1) ? ~(num >> 1) : (num >> 1);
      }

      return numbers;
    },

    encodeUnsignedIntegers: function (numbers) {
      const encoded = '';
      for (const i = 0, len = numbers.length; i < len; i += 1) {
        encoded += this.encodeUnsignedInteger(numbers[i]);
      }
      return encoded;
    },

    decodeUnsignedIntegers: function (encoded) {
      const numbers = [];

      const current = 0;
      const shift = 0;

      for (const i = 0, len = encoded.length; i < len; i += 1) {
        const b = encoded.charCodeAt(i) - 63;

        current |= (b & 0x1f) << shift;

        if (b < 0x20) {
          numbers.push(current);
          current = 0;
          shift = 0;
        } else {
          shift += 5;
        }
      }

      return numbers;
    },

    encodeSignedInteger: function (num) {
      num = (num < 0) ? ~(num << 1) : (num << 1);
      return this.encodeUnsignedInteger(num);
    },

    // This function is very similar to Google's, but I added
    // some stuff to deal with the double slash issue.
    encodeUnsignedInteger: function (num) {
      const encoded = '';
      let value; 
      while (num >= 0x20) {
        value = (0x20 | (num & 0x1f)) + 63;
        encoded += (String.fromCharCode(value));
        num >>= 5;
      }
      value = num + 63;
      encoded += (String.fromCharCode(value));

      return encoded;
    }
  };

  // Export Node module
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = PolylineUtil;
  }

  // Inject functionality into Leaflet
  if (typeof L === 'object') {
    if (!(L.Polyline.prototype.fromEncoded)) {
      L.Polyline.fromEncoded = function (encoded, options) {
        return L.polyline(PolylineUtil.decode(encoded), options);
      };
    }
    if (!(L.Polygon.prototype.fromEncoded)) {
      L.Polygon.fromEncoded = function (encoded, options) {
        return L.polygon(PolylineUtil.decode(encoded), options);
      };
    }

    const encodeMixin = {
      encodePath: function () {
        return PolylineUtil.encode(this.getLatLngs());
      },
    };

    if (!L.Polyline.prototype.encodePath) {
      L.Polyline.include(encodeMixin);
    }
    if (!L.Polygon.prototype.encodePath) {
      L.Polygon.include(encodeMixin);
    }

    L.PolylineUtil = PolylineUtil;
  }
})();
