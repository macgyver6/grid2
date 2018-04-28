`define(['model/types', 'date_lib/parser', 'polyfills'], function(
  types,
  peg_parser
) {
  'use strict';

  var lib = {};

  /**
   * This class models a [potentially ambiguous] instant
   * in time via six component variables (year, month, day, hour,
   * minute, second.)
   *
   * @constructor
   * @param {object} spec spec object representing date/time information
   * with the following properties: 'year', 'month', 'day', 'hour,
   * 'minute', 'second', and 'timezone'
   *
   * @author Chris Stolte (stolte@unc.edu)
   */
  lib.DateTime = function(spec) {
    /* date and time components */
    var year = undefined,
      /* 1 based */
      month = undefined,
      day = undefined,
      /* 0-based */
      hour = undefined,
      minute = undefined,
      second = undefined,
      /* IANA Zone string */
      timezone = undefined,
      /* self reference */
      selfRef = this;

    if (spec) {
      year = spec.year === null ? undefined : spec.year;
      month = spec.month === null ? undefined : spec.month;
      day = spec.day === null ? undefined : spec.day;
      hour = spec.hour === null ? undefined : spec.hour;
      minute = spec.minute === null ? undefined : spec.minute;
      second = spec.second === null ? undefined : spec.second;
      timezone = spec.timezone === null ? undefined : spec.timezone;
    } else {
      throw new Error('Spec object must not be undefined');
    }

    /**********************************************
     * Private methods
     * *********************************************
     */

    /**
     * Compare two date components, using the given default value for any
     * component which is undefined.
     *
     * @param {number} field1 first field to compare
     * @param {number} field2 second field to compare
     * @param {number} defaultValue default value used for any undefined field
     *
     * @returns {number} negative integer, zero, or positive integer if the
     * first field is less than, identical to, or greater than the second
     * field
     */
    var _compareFieldTo = function(field1, field2, defaultValue) {
      var f1 = field1 === undefined ? defaultValue : field1;
      var f2 = field2 === undefined ? defaultValue : field2;

      if (f1 < f2) {
        return -1;
      } else if (f1 === f2) {
        return 0;
      } else if (f1 > f2) {
        return 1;
      }
    };

    /**********************************************
     * Public methods
     * *********************************************
     */

    /**
     * Determine whether the date/time is chronologically equal to the
     * given date/time.
     *
     * @param {lib.DateTime} datetime date/time to which
     * to compare
     *
     * @returns {Boolean} <code>true</code> if equal to the given
     * date/time, <code>false</code> otherwise
     */
    this.equals = function(datetime) {
      if (datetime === undefined) {
        return false;
      }

      return (
        (year == datetime.getYear() ||
          (year === undefined && datetime.getYear() === undefined)) &&
        (month == datetime.getMonth() ||
          (month === undefined && datetime.getMonth() === undefined)) &&
        (day == datetime.getDay() ||
          (day === undefined && datetime.getDay() === undefined)) &&
        (hour == datetime.getHour() ||
          (hour === undefined && datetime.getHour() === undefined)) &&
        (minute == datetime.getMinute() ||
          (minute === undefined && datetime.getMinute() === undefined)) &&
        (second == datetime.getSecond() ||
          (second === undefined && datetime.getSecond() === undefined))
      );
    };

    /**
     * Get the year component of the date.
     *
     * @returns {Number} year component or <code>undefined</code> if the
     * date has no year component
     */
    this.getYear = function() {
      return year;
    };

    /**
     * Get the month component of the date.
     *
     * @returns {Number} month component or <code>undefined</code> if the
     * date has no month component
     */
    this.getMonth = function() {
      return month;
    };

    /**
     * Get the day component of the date.
     *
     * @returns {Number} day component or <code>undefined</code> if the
     * date has no day component
     */
    this.getDay = function() {
      return day;
    };

    /**
     * Get the hour component of the date.
     *
     * @returns {Number} hour component of date (zero-based) or
     * <code>undefined</code> if the date has no hour component
     */
    this.getHour = function() {
      return hour;
    };

    /**
     * Get the minute component of the date.
     *
     * @returns {Number} minute component of date (zero-based) or
     * <code>undefined</code> if the date has no minute component
     */
    this.getMinute = function() {
      return minute;
    };

    /**
     * Get the second component of the date.
     *
     * @returns {Number} second component of date (zero-based) or
     * <code>undefined</code> if the date has no second component
     */
    this.getSecond = function() {
      return second;
    };

    /**
     * Get the timezone of the date.
     *
     * @returns {String} zone identifier in Area/Location format
     */
    this.getTimezone = function() {
      return timezone;
    };

    /**
     * Convert the date/time into a string representation suitable for use
     * in debugging.
     *
     * @override
     * @returns {String} string representation of date/time
     */
    this.toString = function() {
      var str = '';
      var _pad = lib.DateTime.format._zeroPad;

      if (selfRef.getYear()) {
        str += selfRef.getYear();
      }

      if (selfRef.getMonth()) {
        if (str.length > 0) {
          str += '-';
        }
        str += selfRef.getMonth();
      }

      if (selfRef.getDay()) {
        if (str.length > 0) {
          str += '-';
        }
        str += selfRef.getDay();
      }

      if (selfRef.getHour() !== undefined) {
        if (str.length > 0) {
          str += ' ';
        }
        str += _pad(selfRef.getHour(), 2);
      }

      if (selfRef.getMinute() !== undefined) {
        if (str.length > 0) {
          str += ':';
        }
        str += _pad(selfRef.getMinute(), 2);
      }

      if (selfRef.getSecond() !== undefined) {
        if (str.length > 0) {
          str += ':';
        }
        str += _pad(selfRef.getSecond(), 2);
      }

      return str;
    };

    /**
     * Convert the date/time into the canonical string,
     * which is non-ambiguous and unique representation
     * of the instant modeled.
     *
     * @returns {String} canonical string representation of date/time
     */
    this.toCanonicalString = function() {
      // format is YYYYMMDDThhmmss-TZ

      var string = '';
      var _pad = lib.DateTime.format._zeroPad;

      string +=
        selfRef.getYear() === undefined ? '====' : _pad(selfRef.getYear(), 4);
      string +=
        selfRef.getMonth() === undefined ? '==' : _pad(selfRef.getMonth(), 2);
      string +=
        selfRef.getDay() === undefined ? '==' : _pad(selfRef.getDay(), 2);

      string += 'T';

      string +=
        selfRef.getHour() === undefined ? '==' : _pad(selfRef.getHour(), 2);
      string +=
        selfRef.getMinute() === undefined ? '==' : _pad(selfRef.getMinute(), 2);
      string +=
        selfRef.getSecond() === undefined ? '==' : _pad(selfRef.getSecond(), 2);

      string += '-' + selfRef.getTimezone();

      return string;
    };

    /**
     * <p>
     * Compare this date to a given date.  So as to produce unambiguous
     * comparison results, this method makes use of a series of
     * rules to imply missing components when comparing dates with
     * different precisions.  For these rules, please refer to the CDART
     * Date Specification.
     * </p>
     *
     * <p>
     * <b>NOTE:</b> Daylight savings time is <b><u>NOT</u></b> accounted for
     * in this comparison.
     * </p>
     *
     * @param {lib.DateTime} date date to which to compare
     * @returns {number} negative integer if the date falls before the
     * given date, zero if the two dates refer to the same instant,
     * positive integer if the date falls after the given date.
     */
    this.compareTo = function(date) {
      if (date === undefined) {
        throw 'Date for comparison must not be undefined';
      }

      if (!(date instanceof lib.DateTime)) {
        throw new TypeError('Date must be instance of ' + 'lib.DateTime');
      }

      var result = 0;

      // Compare components in both objects, in order.
      result = _compareFieldTo(selfRef.getYear(), date.getYear(), 0);
      if (result !== 0) {
        return result;
      }

      result = _compareFieldTo(selfRef.getMonth(), date.getMonth(), 1);
      if (result !== 0) {
        return result;
      }

      result = _compareFieldTo(selfRef.getDay(), date.getDay(), 1);
      if (result !== 0) {
        return result;
      }

      /*
				 * Hours need to be offset according to timezone differences...
				 */

      var h1_offset = lib.DateTime.getOffset(selfRef.getTimezone()),
        h2_offset = lib.DateTime.getOffset(date.getTimezone());

      if (h1_offset === undefined) {
        throw new Error(
          "Unable to determine offset for timezone '" +
            selfRef.getTimezone() +
            "'"
        );
      }

      if (h2_offset === undefined) {
        throw new Error(
          "Unable to determine offset for timezone '" + date.getTimezone() + "'"
        );
      }

      var h1 = selfRef.getHour() === undefined ? 0 : selfRef.getHour();
      var h2 = date.getHour() === undefined ? 0 : date.getHour();
      h1 = h1 - h1_offset;
      h2 = h2 - h2_offset;

      result = _compareFieldTo(h1, h2, 0);
      if (result !== 0) {
        return result;
      }

      result = _compareFieldTo(selfRef.getMinute(), date.getMinute(), 0);
      if (result !== 0) {
        return result;
      }

      result = _compareFieldTo(selfRef.getSecond(), date.getSecond(), 0);
      return result;
    };

    /**
     * Determine whether the date is constrained by the given type. A
     * date is considered constrained by a type iff. the components
     * present in the date are specified by the type (and, for
     * fixed-precision types, all of the components specified in the
     * type are present in the date.)
     *
     * @param {type_model.DateType} date type
     * @return {boolean} true if the date is constrained by the type,
     * false otherwise
     */
    this.constrainedBy = function(type) {
      var valid = true;

      /* all of this could be much more compact, but we're going
				 * for clarity here
				 */

      if (type.fixedPrecision()) {
        valid = valid && type.hasYear() === (selfRef.getYear() !== undefined);
        valid = valid && type.hasMonth() === (selfRef.getMonth() !== undefined);
        valid = valid && type.hasDay() === (selfRef.getDay() !== undefined);
        valid = valid && type.hasHour() === (selfRef.getHour() !== undefined);
        valid =
          valid && type.hasMinute() === (selfRef.getMinute() !== undefined);
        valid =
          valid &&
          (type.hasSecond() === (selfRef.getSecond() !== undefined) ||
            (!type.hasSecond() && selfRef.getSecond() === 0)); // WORK AROUND FOR LEGACY BUG WHERE SECONDS HAD ZEROS
      } else {
        if (!type.hasYear()) {
          valid = valid && selfRef.getYear() === undefined;
        }
        if (!type.hasMonth()) {
          valid = valid && selfRef.getMonth() === undefined;
        }
        if (!type.hasDay()) {
          valid = valid && selfRef.getDay() === undefined;
        }
        if (!type.hasHour()) {
          valid = valid && selfRef.getHour() === undefined;
        }
        if (!type.hasMinute()) {
          valid = valid && selfRef.getMinute() === undefined;
        }
        if (!type.hasSecond()) {
          valid =
            valid &&
            (selfRef.getSecond() === undefined || selfRef.getSecond() === 0); // WORK AROUND FOR LEGACY BUG WHERE SECONDS HAD ZEROS
        }
      }
      return valid;
    };

    /**
     * Determine whether or not the given date can be used as a
     * bound for the calling object. In order to be eligible as
     * a bound, the date must not contain components that aren't
     * present in the calling object itselfRef.
     *
     * @param {lib.DateTime} date date to determine bound
     * eligibility for
     * @returns {boolean} true if date can be used as bound, false otherwise
     */
    this.canBeBoundedBy = function(date) {
      if (selfRef.getYear() === undefined && date.getYear() !== undefined) {
        return false;
      }

      if (selfRef.getMonth() === undefined && date.getMonth() !== undefined) {
        return false;
      }

      if (selfRef.getDay() === undefined && date.getDay() !== undefined) {
        return false;
      }

      if (selfRef.getHour() === undefined && date.getHour() !== undefined) {
        return false;
      }

      if (selfRef.getMinute() === undefined && date.getMinute() !== undefined) {
        return false;
      }

      if (selfRef.getSecond() === undefined && date.getSecond() !== undefined) {
        return false;
      }

      return true;
    };

    /**
     * Produce a spec object which may be used for the construction of an
     * identical {@link lib.DateTime} instance.
     *
     * @returns {object} spec object
     */
    this.spec = function() {
      return {
        year: selfRef.getYear(),
        month: selfRef.getMonth(),
        day: selfRef.getDay(),
        hour: selfRef.getHour(),
        minute: selfRef.getMinute(),
        second: selfRef.getSecond(),
        timezone: selfRef.getTimezone(),
      };
    };
  };

  /**
   * Create a CDate instance from a canonical string
   *
   * format is YYYYMMDDThhmmss-TZ
   *
   * @param {String} canonicalStr representation of a date in the CDART2 canonical
   * date format
   * @returns {lib.DateTime} date corresponding to the given
   * string, or <code>undefined</code> if the given string could not be parsed
   */
  lib.DateTime.fromCanonicalString = function(canonicalStr) {
    /**
     * Get the integer corresponding to the given input string.  Unlike
     * parseInt(), this method will reject strings not comprised solely of
     * digits.
     *
     * @param {String} data data to parse as integer
     * @returns {number|Boolean} integer corresponding to the given input, or
     * <code>false</code> if the input could not be interpreted as an integer
     */
    var parseInteger = function(data) {
      if (!data) {
        return undefined;
      }

      var regex = new RegExp('^\\d+$');
      if (data.toString().match(regex)) {
        return parseInt(data, 10);
      }

      return undefined;
    };

    var canonical = new String(canonicalStr);

    // 15 characters for everything except the hyphen
    // and timezone string, which presumably has to be
    // at least one character long.
    if (canonical.length < 17) {
      return undefined;
    }

    var year, month, day, hour, minute, second;

    // year
    var token = canonical.substr(0, 4);
    if (token === '====') {
      year = undefined;
    } else {
      year = parseInteger(token);
      if (year === undefined) {
        return undefined;
      }
    }

    // month
    token = canonical.substr(4, 2);
    if (token === '==') {
      month = undefined;
    } else {
      month = parseInteger(token);
      if (month === undefined) {
        return undefined;
      }
    }

    // day
    token = canonical.substr(6, 2);
    if (token === '==') {
      day = undefined;
    } else {
      day = parseInteger(token);
      if (day === undefined) {
        return undefined;
      }
    }

    // hour
    token = canonical.substr(9, 2);
    if (token === '==') {
      hour = undefined;
    } else {
      hour = parseInteger(token);
      if (hour === undefined) {
        return undefined;
      }
    }

    // minute
    token = canonical.substr(11, 2);
    if (token === '==') {
      minute = undefined;
    } else {
      minute = parseInteger(token);
      if (minute === undefined) {
        return undefined;
      }
    }

    // second
    token = canonical.substr(13, 2);
    if (token === '==') {
      second = undefined;
    } else {
      second = parseInteger(token);
      if (second === undefined) {
        return undefined;
      }
    }

    // timezone string
    token = canonical.substr(16);

    var spec = {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second,
      timezone: token,
    };

    return new lib.DateTime(spec);
  };

  /**
   * Get a CDate instance representing today, down to the day.
   *
   * @param {string} timezone timezone in which to consider "today",
   * or <code>undefined</code> to use the "Unknown" timezone
   * @returns {lib.DateTime}
   */
  lib.DateTime.today = function(timezone) {
    var now = new Date();
    var spec = {
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      day: now.getUTCDate(),
      timezone: timezone === undefined ? 'Unknown/Unknown' : timezone,
    };

    return new lib.DateTime(spec);
  };

  /**
   * Get a CDate instance representing right now, down to the second.
   *
   * @param {string} timezone timezone in which to consider "now",
   * or <code>undefined</code> to use the "Unknown" timezone
   * @returns {lib.DateTime}
   */
  lib.DateTime.now = function(timezone) {
    var now = new Date();
    var spec = {
      year: now.getUTCFullYear(),
      month: now.getUTCMonth() + 1,
      day: now.getUTCDate(),
      hour: now.getUTCHours(),
      minute: now.getUTCMinutes(),
      second: now.getUTCSeconds(),
      timezone: timezone === undefined ? 'Unknown/Unknown' : timezone,
    };

    return new lib.DateTime(spec);
  };

  /**
   * Get the UTC offset for the specified timezone.
   *
   * @param {String} timezoneStr IANA Zone in Area/Location format
   * @returns {number} UTC offset for the given timezone in hours, or
   * <code>undefined</code> if no such timezone was recognized
   */
  lib.DateTime.getOffset = function(timezoneStr) {
    if (lib.DateTime.timezones.hasOwnProperty(timezoneStr)) {
      return lib.DateTime.timezones[timezoneStr];
    } else {
      return undefined;
    }
  };

  /**
   * Format the given date into a human-readable string.  The resulting string
   * will be formatted according to the formats described by the given spec
   * object (if any), or those defaults specified by
   * {@link lib.DateTime.format.DEFAULT_SPEC} if no spec object is
   * given.  A suitable format will be chosen from the given/default spec
   * based on the given date type and the components present in the date to be
   * formatted.
   *
   * @param {lib.DateTime} date date to format
   * @param {DateType} type_spec date type
   * @param {Object} format_spec format specification object, will be
   * merged with {@link lib.DateTime.format.DEFAULT_SPEC}
   * @returns {String} formatted date
   */
  lib.DateTime.format = function(date, type_spec, format_spec) {
    var fmt = {},
      format = format_spec,
      DEFAULT_FMT = lib.DateTime.format.DEFAULT_SPEC,
      type = type_spec;

    var req_date, req_time;

    var chosen_format = undefined;

    if (!(date instanceof lib.DateTime)) {
      throw new TypeError('Date must be instance of CDate');
    }

    if (format === undefined) {
      format = {};
    }

    fmt.full = (format.full !== undefined ? format : DEFAULT_FMT).full;
    fmt.date = (format.date !== undefined ? format : DEFAULT_FMT).date;
    fmt.day = (format.day !== undefined ? format : DEFAULT_FMT).day;
    fmt.month = (format.month !== undefined ? format : DEFAULT_FMT).month;
    fmt.month_day = (format.month_day !== undefined
      ? format
      : DEFAULT_FMT
    ).month_day;
    fmt.year_month = (format.year_month !== undefined
      ? format
      : DEFAULT_FMT
    ).year_month;
    fmt.year = (format.year !== undefined ? format : DEFAULT_FMT).year;
    fmt.time = (format.time !== undefined ? format : DEFAULT_FMT).time;
    fmt.hour_minute = (format.hour_minute !== undefined
      ? format
      : DEFAULT_FMT
    ).hour_minute;

    var choose_date_format = function(date_obj, fmt_spec, type_obj) {
      if (type_obj.hasYear()) {
        /* just year */
        if (!type_obj.hasMonth() && !type_obj.hasDay()) {
          return fmt_spec.year;
        } else if (!type_obj.hasDay()) {
          return fmt_spec.year_month;
        }

        return fmt_spec.date;
      }

      if (type_obj.hasMonth()) {
        if (type_obj.hasDay()) {
          return fmt_spec.month_day;
        }
        return fmt_spec.month;
      } else if (type_obj.hasDay()) {
        return fmt_spec.day;
      }
      /* WTF? */
      throw new Error(
        'Unable to pick date format for date type ' + 'with no date components'
      );
    };

    var choose_time_format = function(date_obj, fmt_spec, type_obj) {
      if (type_obj.hasSecond() && date_obj.getSecond() !== undefined) {
        return fmt_spec.time;
      }

      return fmt_spec.hour_minute;
    };

    var format_date = function(date_obj, format_str) {
      /* tokenize format string */

      var output = '';

      var buf = '';

      var ch = undefined;

      for (var i = 0; i < format_str.length; i++) {
        var tok;
        ch = format_str.charAt(i);

        if (ch === '%') {
          output += buf;
          buf = '';
        }

        buf += ch;

        /* if we're in a token, check if we've hit the end of said
					 * token
					 */
        if (buf.charAt(0) === '%' && buf.length > 1) {
          var tok_fn;
          tok = buf.substring(1);
          tok_fn = lib.DateTime.format.TOK_FN[tok];
          if (tok_fn !== undefined && typeof tok_fn === 'function') {
            output += tok_fn(date_obj);
            buf = '';
            continue;
          }
        }
      }

      output += buf;

      return output;
    };

    /* format selection logic */

    req_date = type.hasYear() || type.hasMonth() || type.hasDay();

    req_time = type.hasHour() || type.hasMinute() || type.hasSecond();

    if (req_date && req_time) {
      /* narrow to either: full, date-only, or time only */

      if (
        date.getDay() !== undefined ||
        date.getMonth() !== undefined ||
        date.getYear !== undefined
      ) {
        if (
          date.getHour() !== undefined ||
          date.getMinute() !== undefined ||
          date.getSecond() !== undefined
        ) {
          chosen_format = fmt.full;
        } else {
          chosen_format = fmt.date;
        }
      } else {
        /* time only */
        chosen_format = fmt.time;
      }
    }

    if (!chosen_format && req_date) {
      /* date, but what type? */
      chosen_format = choose_date_format(date, fmt, type);
    }

    if (!chosen_format && req_time) {
      /* time */
      chosen_format = choose_time_format(date, fmt, type);
    }

    if (!chosen_format) {
      /* this should never happen */
      throw 'Unable to find suitable format';
    }

    /* now that we have a format, format the date according to it */

    return format_date(date, chosen_format);
  };

  lib.DateTime.format.DEFAULT_SPEC = {
    full: '%mm-%dd-%yyyy %HH:%tt:%ss',
    date: '%mm-%dd-%yyyy',
    year: '%yyyy',
    month: '%M',
    day: '%dd',
    month_day: '%mm-%dd',
    year_month: '%mm-%yyyy',
    time: '%hh:%tt:%ss %A',
    hour_minute: '%hh:%tt %A',
  };

  lib.DateTime.format.TOKENS = {
    year: 'yyyy',
    month: 'mm',
    full_month: 'W',
    short_month: 'M',
    day: 'dd',
    hour: 'HH',
    hour_12: 'hh',
    minute: 'tt',
    second: 'ss',
    am_pm: 'A',
    DELIMITER: '%',
    PLACEHOLDER: '=',
  };

  /**
   * Produce a zero-padded string representation of the given number.  If the
   * given number's default string representation contains fewer than the
   * specified number of characters, the resulting string will be padded with
   * leading zeros to the specified length.
   *
   * @param {Number} num number to zero-pad
   * @param {Number} len length of resulting string
   * @returns {String} zero-padded string representation of the given number
   */
  lib.DateTime.format._zeroPad = function(num, len) {
    var str = String(num);

    if (len === undefined) {
      throw new Error("Missing parameter 'len'");
    }

    while (str.length < len) {
      str = '0' + str;
    }
    return str;
  };

  lib.DateTime.format.TOK_FN = {
    yyyy: function(date) {
      if (date.getYear() !== undefined) {
        return lib.DateTime.format._zeroPad(date.getYear(), 4);
      }
      return '====';
    },

    mm: function(date) {
      if (date.getMonth() !== undefined) {
        return lib.DateTime.format._zeroPad(date.getMonth(), 2);
      }
      return '==';
    },

    W: function(date) {
      if (date.getMonth() !== undefined) {
        var months = {
          1: 'January',
          2: 'February',
          3: 'March',
          4: 'April',
          5: 'May',
          6: 'June',
          7: 'July',
          8: 'August',
          9: 'September',
          10: 'October',
          11: 'November',
          12: 'December',
        };

        return months[date.getMonth()];
      }
      return '==';
    },

    M: function(date) {
      if (date.getMonth() === undefined) {
        return '===';
      }
      return lib.DateTime.format.TOK_FN['W'](date).substring(0, 3);
    },

    dd: function(date) {
      if (date.getDay() !== undefined) {
        return lib.DateTime.format._zeroPad(date.getDay(), 2);
      }
      return '==';
    },

    HH: function(date) {
      if (date.getHour() !== undefined) {
        return lib.DateTime.format._zeroPad(date.getHour(), 2);
      }
      return '==';
    },

    hh: function(date) {
      var hour = date.getHour();
      if (hour !== undefined) {
        if (hour > 12) {
          hour = hour - 12;
        }

        if (hour === 0) {
          hour = 12;
        }

        return lib.DateTime.format._zeroPad(hour, 2);
      }

      return '==';
    },

    tt: function(date) {
      var min = date.getMinute();
      if (min !== undefined) {
        return lib.DateTime.format._zeroPad(min, 2);
      }
      return '==';
    },

    ss: function(date) {
      var sec = date.getSecond();
      if (sec !== undefined) {
        return lib.DateTime.format._zeroPad(sec, 2);
      }
      return '==';
    },

    A: function(date) {
      if (date.getHour() === undefined) {
        return '';
      }

      return date.getHour() < 12 ? 'AM' : 'PM';
    },

    CIX: function(date) {
      var buf = '';
      var _pad = lib.DateTime.format._zeroPad;

      buf += date.getYear() !== undefined ? date.getYear() : '====';
      buf += date.getMonth() !== undefined ? _pad(date.getMonth(), 2) : '==';
      buf += date.getDay() !== undefined ? _pad(date.getDay(), 2) : '==';
      buf += 'T';
      buf += date.getHour() !== undefined ? _pad(date.getHour(), 2) : '==';
      buf += date.getMinute() !== undefined ? _pad(date.getMinute(), 2) : '==';
      buf += date.getSecond() !== undefined ? _pad(date.getSecond(), 2) : '==';
      buf += '-UTC';

      return buf;
    },
  };

  /**
   * Attempt to parse the given input into a {@link lib.DateTime}
   * object.  Parsing may use month-first or day-first precedence when
   * differentiating between two-digit component representations.
   *
   * @param {String} input input string to parse to a date
   * @param {Boolean} dayFirst <code>true</code> if day should be given
   * precedence when parsing, <code>false</code> otherwise; defaults to
   * <code>false</code>
   * @param {Boolean} exBadParse <code>true</code> if malformed or invalid
   * input should generate an exception, <code>false</code> if
   * <code>undefined</code> should be returned instead; defaults to
   * <code>true</code>
   *
   * @returns {lib.DateTime} date corresponding to given input or
   * <code>undefined</code> if input could not be parsed
   * @throws {@link lib.DateTime.parse.ParseError} thrown if
   * 	parsing failed
   * @throws {@link lib.DateTime.parse.MalformedDateError} thrown
   * 	if logically-invalid date values resulted from parsing
   */
  lib.DateTime.parse = function(input, dayFirst, exBadParse) {
    if (!peg_parser) {
      throw new Error('parser lib missing');
    }

    if (typeof input !== 'string' && !(input instanceof String)) {
      throw new TypeError('input was not string');
    }

    var parser = peg_parser;
    var startRule = dayFirst === true ? 'df_date' : 'mf_date';

    var dateSpec = undefined;

    var throwEx = exBadParse === false ? false : true;

    /* special handling for time-only */
    var toRegex = new RegExp(
      '^((0?[0-9])|(1[0-9])|(2[0-3])):[0-5][0-9](:[0-5][0-9])?\\s*([AaPp][Mm])?$'
    );

    var trimmedInput = input.replace(/^\s+|\s+$/gm, '');

    if (trimmedInput.match(toRegex)) {
      /* it's a time-only date, so parse manually */

      /* split out hour */
      var idxColon = trimmedInput.indexOf(':');

      var strHour = trimmedInput.substring(0, idxColon);
      var strMin = trimmedInput.substring(idxColon + 1, idxColon + 3);

      var idxSecColon = trimmedInput.indexOf(':', idxColon + 3);
      var strSec = undefined;
      if (idxSecColon > 0) {
        strSec = trimmedInput.substring(idxSecColon + 1, idxSecColon + 3);
      }

      var strA = undefined;

      if (trimmedInput.charAt(trimmedInput.length - 1).toLowerCase() === 'm') {
        strA = trimmedInput.substring(trimmedInput.length - 2);
      }

      var numHour = parseInt(strHour, 10);
      var numMin = parseInt(strMin, 10);
      var numSec = strSec === undefined ? undefined : parseInt(strSec, 10);
      if (strA !== undefined) {
        var am = strA.toLowerCase() === 'am';

        if (numHour > 12 || numHour === 0) {
          if (throwEx) {
            throw new lib.DateTime.parse.MalformedDateError(
              'AM/PM specification is incompatible with 24-hour ' +
                'clock; hour must be in range of 1-12 (inclusive)'
            );
          } else {
            return undefined;
          }
        }

        if (am) {
          if (numHour === 12) {
            numHour = 0;
          }
        } else {
          if (numHour < 12) {
            numHour += 12;
          }
        }
      }

      return new lib.DateTime({
        hour: numHour,
        minute: numMin,
        second: numSec,
        timezone: 'Unknown/Unknown',
      });
    }

    try {
      dateSpec = parser.parse(input, { startRule: startRule });
    } catch (e) {
      if (throwEx) {
        throw new lib.DateTime.parse.ParseError(e.offset, e.message);
      }
      return undefined;
    }

    if (dateSpec === undefined) {
      return undefined;
    }

    /* validate properties */

    var _valRange = function(value, min, max, name) {
      if (value === undefined) {
        return;
      }

      if (value < min || value > max) {
        throw new lib.DateTime.parse.MalformedDateError(
          "Value '" +
            value +
            "' for " +
            name +
            ' out of range; must be between ' +
            min +
            ' and ' +
            max +
            ' (inclusive)'
        );
      }
    };

    try {
      _valRange(dateSpec.year, 0, 2999, 'year');
      _valRange(dateSpec.month, 1, 12, 'month');
      _valRange(dateSpec.day, 0, 31, 'day');
      _valRange(dateSpec.hour, 0, 23, 'hour');
      _valRange(dateSpec.minute, 0, 59, 'minute');
      _valRange(dateSpec.second, 0, 59, 'second');
    } catch (e) {
      if (throwEx) {
        throw e;
      }
      return undefined;
    }

    var _isLeapYear = function(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    try {
      /* sanity check dates against month if both present */
      var _sm = dateSpec.month,
        _sd = dateSpec.day;
      if (dateSpec.day !== undefined && dateSpec.month !== undefined) {
        if (_sm === 2) {
          if (_sd > 29) {
            throw new lib.DateTime.parse.MalformedDateError(
              'Invalid day component (' + _sd + ') for February'
            );
          }

          if (dateSpec.year !== undefined) {
            if (!_isLeapYear(dateSpec.year) && _sd === 29) {
              throw new lib.DateTime.parse.MalformedDateError(
                'February can only have 29 days in a ' +
                  'leap year, which ' +
                  dateSpec.year +
                  ' is not.'
              );
            }
          }
        } else if (_sd > 30) {
          if (_sm === 4 || _sm === 6 || _sm === 9 || _sm === 11) {
            throw new lib.DateTime.parse.MalformedDateError(
              '31 days specified, but month (' + _sm + ') only has 30'
            );
          }
        }
      }
    } catch (e) {
      if (throwEx) {
        throw e;
      }
      return undefined;
    }

    /* special case: add seconds if omitted but hours + minutes specified */

    if (dateSpec.hour !== undefined && dateSpec.minute !== undefined) {
      if (dateSpec.second === undefined) {
        dateSpec.second = 0;
      }
    }

    if (dateSpec.timezone === undefined) {
      dateSpec.timezone = 'Unknown/Unknown';
    }

    return new lib.DateTime(dateSpec);
  };

  /**
   * Error indicating a failure caused by malformed input, i.e. input which
   * could not be parsed to a date.
   *
   * @constructor
   * @param {number} position character position within the input string at
   * which the malformed input was encountered
   * @param {String} message message describing the parse failure
   * @returns {lib.DateTime.parse.ParseError}
   */
  lib.DateTime.parse.ParseError = function(position, message) {
    var _pos = position;

    this.message = message;

    this.getMessage = function() {
      return this.message;
    };

    this.getPosition = function() {
      return _pos;
    };

    this.name = 'ParseError';
  };
  lib.DateTime.parse.ParseError.prototype = Object.create(Error.prototype);

  /**
   * Error indicating a malformed date; i.e. a date which was parsed to a
   * logically-impossible set of values.
   *
   * @constructor
   * @param {String} message error message describing the failure
   * @returns {lib.DateTime.parse.MalformedDateError}
   */
  lib.DateTime.parse.MalformedDateError = function(message) {
    this.message = message;

    /**
     * Get the error message describing the failure.
     *
     * @returns {String} error message
     */
    this.getMessage = function() {
      return this.message;
    };

    this.name = 'MalformedDateError';
  };
  lib.DateTime.parse.MalformedDateError.prototype = Object.create(
    Error.prototype
  );

  /**
   * These timezones/offsets were taken from the IANA
   * database files using some Perl hackery (with the exception
   * of "UTC", "GMT", and "Unknown/Unknown", which have been
   * manually added.) Please consider those files authoritative
   * in the event of a discrepancy. Note that Daylight Savings is
   * NOT considered at all!
   */
  lib.DateTime.timezones = Object.freeze({
    UTC: 0,
    GMT: 0,
    'Unknown/Unknown': 0,
    'Africa/Algiers': 1,
    'Africa/Luanda': 1,
    'Africa/Porto-Novo': 1,
    'Africa/Gaborone': 2,
    'Africa/Ouagadougou': 0,
    'Africa/Bujumbura': 2,
    'Africa/Douala': 1,
    'Atlantic/Cape_Verde': -1,
    'Africa/Bangui': 1,
    'Africa/Ndjamena': 1,
    'Indian/Comoro': 3,
    'Africa/Kinshasa': 2,
    'Africa/Brazzaville': 1,
    'Africa/Abidjan': 0,
    'Africa/Djibouti': 3,
    'Africa/Cairo': 2,
    'Africa/Malabo': 1,
    'Africa/Asmara': 3,
    'Africa/Addis_Ababa': 3,
    'Africa/Libreville': 1,
    'Africa/Banjul': 0,
    'Africa/Accra': 0,
    'Africa/Conakry': 0,
    'Africa/Bissau': 0,
    'Africa/Nairobi': 3,
    'Africa/Maseru': 2,
    'Africa/Monrovia': 0,
    'Africa/Tripoli': 1,
    'Indian/Antananarivo': 3,
    'Africa/Blantyre': 2,
    'Africa/Bamako': 0,
    'Africa/Nouakchott': 0,
    'Indian/Mauritius': 4,
    'Indian/Mayotte': 3,
    'Africa/Casablanca': 0,
    'Africa/El_Aaiun': 0,
    'Africa/Maputo': 2,
    'Africa/Windhoek': 1,
    'Africa/Niamey': 1,
    'Africa/Lagos': 1,
    'Indian/Reunion': 4,
    'Africa/Kigali': 2,
    'Atlantic/St_Helena': 0,
    'Africa/Sao_Tome': 0,
    'Africa/Dakar': 0,
    'Indian/Mahe': 4,
    'Africa/Freetown': 0,
    'Africa/Mogadishu': 3,
    'Africa/Johannesburg': 2,
    'Africa/Khartoum': 3,
    'Africa/Mbabane': 2,
    'Africa/Dar_es_Salaam': 3,
    'Africa/Lome': 0,
    'Africa/Tunis': 1,
    'Africa/Kampala': 3,
    'Africa/Lusaka': 2,
    'Antarctica/Casey': 5,
    'Indian/Kerguelen': 5,
    'Antarctica/DumontDUrville': 10,
    'Antarctica/Syowa': 3,
    'Antarctica/Vostok': 6,
    'Antarctica/Rothera': -3,
    'Antarctica/Palmer': -4,
    'Asia/Kabul': 4,
    'Asia/Yerevan': 4,
    'Asia/Baku': 4,
    'Asia/Bahrain': 3,
    'Asia/Dhaka': 6,
    'Asia/Thimphu': 6,
    'Indian/Chagos': 6,
    'Asia/Brunei': 8,
    'Asia/Rangoon': 6,
    'Asia/Phnom_Penh': 7,
    'Asia/Harbin': 8,
    'Asia/Shanghai': 8,
    'Asia/Chongqing': 8,
    'Asia/Urumqi': 8,
    'Asia/Kashgar': 8,
    'Asia/Hong_Kong': 8,
    'Asia/Taipei': 8,
    'Asia/Macau': 8,
    'Asia/Nicosia': 2,
    'Asia/Tbilisi': 4,
    'Asia/Dili': 9,
    'Asia/Kolkata': 5,
    'Asia/Jakarta': 7,
    'Asia/Pontianak': 7,
    'Asia/Makassar': 8,
    'Asia/Jayapura': 9,
    'Asia/Tehran': 3,
    'Asia/Baghdad': 3,
    'Asia/Jerusalem': 2,
    'Asia/Tokyo': 9,
    'Asia/Amman': 2,
    'Asia/Almaty': 6,
    'Asia/Qyzylorda': 6,
    'Asia/Aqtobe': 5,
    'Asia/Aqtau': 5,
    'Asia/Oral': 5,
    'Asia/Bishkek': 6,
    'Asia/Seoul': 9,
    'Asia/Kuwait': 3,
    'Asia/Vientiane': 7,
    'Asia/Beirut': 2,
    'Asia/Kuala_Lumpur': 8,
    'Asia/Kuching': 8,
    'Indian/Maldives': 5,
    'Asia/Hovd': 7,
    'Asia/Ulaanbaatar': 8,
    'Asia/Choibalsan': 8,
    'Asia/Kathmandu': 5,
    'Asia/Muscat': 4,
    'Asia/Karachi': 5,
    'Asia/Gaza': 2,
    'Asia/Hebron': 2,
    'Asia/Manila': 8,
    'Asia/Qatar': 3,
    'Asia/Riyadh': 3,
    'Asia/Singapore': 8,
    'Asia/Colombo': 5,
    'Asia/Damascus': 2,
    'Asia/Dushanbe': 5,
    'Asia/Bangkok': 7,
    'Asia/Ashgabat': 5,
    'Asia/Dubai': 4,
    'Asia/Samarkand': 5,
    'Asia/Ho_Chi_Minh': 7,
    'Australia/Darwin': 9,
    'Australia/Perth': 8,
    'Australia/Brisbane': 10,
    'Australia/Adelaide': 9,
    'Australia/Hobart': 10,
    'Australia/Melbourne': 10,
    'Australia/Sydney': 9,
    'Australia/Lord_Howe': 10,
    'Antarctica/Macquarie': 11,
    'Indian/Christmas': 7,
    'Pacific/Rarotonga': -10,
    'Indian/Cocos': 6,
    'Pacific/Fiji': 12,
    'Pacific/Gambier': -10,
    'Pacific/Guam': 10,
    'Pacific/Tarawa': 14,
    'Pacific/Saipan': 10,
    'Pacific/Majuro': 12,
    'Pacific/Chuuk': 11,
    'Pacific/Nauru': 12,
    'Pacific/Noumea': 11,
    'Pacific/Auckland': 12,
    'Pacific/Niue': -11,
    'Pacific/Norfolk': 11,
    'Pacific/Palau': 9,
    'Pacific/Port_Moresby': 10,
    'Pacific/Pitcairn': -8,
    'Pacific/Pago_Pago': -11,
    'Pacific/Apia': 13,
    'Pacific/Guadalcanal': 11,
    'Pacific/Fakaofo': 13,
    'Pacific/Tongatapu': 13,
    'Pacific/Funafuti': 12,
    'Pacific/Midway': -11,
    'Pacific/Wake': 12,
    'Pacific/Efate': 11,
    'Pacific/Wallis': 12,
    'Europe/London': 0,
    'Europe/Tirane': 1,
    'Europe/Andorra': 1,
    'Europe/Vienna': 1,
    'Europe/Minsk': 3,
    'Europe/Brussels': 1,
    'Europe/Sofia': 2,
    'Europe/Prague': 1,
    'Europe/Copenhagen': 0,
    'America/Danmarkshavn': -4,
    'Europe/Tallinn': 2,
    'Europe/Helsinki': 2,
    'Europe/Paris': 0,
    'Europe/Berlin': 1,
    'Europe/Gibraltar': 1,
    'Europe/Athens': 2,
    'Europe/Budapest': 1,
    'Atlantic/Reykjavik': 0,
    'Europe/Rome': 1,
    'Europe/Riga': 2,
    'Europe/Vilnius': 2,
    'Europe/Luxembourg': 1,
    'Europe/Malta': 1,
    'Europe/Chisinau': 2,
    'Europe/Monaco': 1,
    'Europe/Amsterdam': 1,
    'Europe/Oslo': 1,
    'Europe/Warsaw': 1,
    'Europe/Lisbon': 0,
    'Europe/Bucharest': 2,
    'Europe/Kaliningrad': 3,
    'Europe/Moscow': 4,
    'Europe/Volgograd': 4,
    'Europe/Samara': 4,
    'Asia/Yekaterinburg': 6,
    'Asia/Omsk': 7,
    'Asia/Novosibirsk': 7,
    'Asia/Novokuznetsk': 7,
    'Asia/Krasnoyarsk': 8,
    'Asia/Irkutsk': 9,
    'Asia/Yakutsk': 10,
    'Asia/Vladivostok': 11,
    'Asia/Khandyga': 10,
    'Asia/Sakhalin': 11,
    'Asia/Magadan': 12,
    'Asia/Ust-Nera': 11,
    'Asia/Kamchatka': 12,
    'Asia/Anadyr': 12,
    'Europe/Belgrade': 1,
    'Europe/Madrid': 0,
    'Europe/Stockholm': 1,
    'Europe/Zurich': 1,
    'Europe/Istanbul': 2,
    'Europe/Kiev': 2,
    'Europe/Uzhgorod': 2,
    'Europe/Zaporozhye': 2,
    'Europe/Simferopol': 2,
    'America/New_York': -5,
    'America/Chicago': -6,
    'America/North_Dakota/Center': -6,
    'America/North_Dakota/New_Salem': -6,
    'America/North_Dakota/Beulah': -6,
    'America/Denver': -7,
    'America/Los_Angeles': -8,
    'America/Juneau': -10,
    'Pacific/Honolulu': -10,
    'America/Phoenix': -7,
    'America/Boise': -7,
    'America/Indiana/Indianapolis': -5,
    'America/Indiana/Marengo': -5,
    'America/Indiana/Vincennes': -5,
    'America/Indiana/Tell_City': -6,
    'America/Indiana/Petersburg': -5,
    'America/Indiana/Knox': -6,
    'America/Indiana/Winamac': -5,
    'America/Indiana/Vevay': -5,
    'America/Kentucky/Louisville': -5,
    'America/Kentucky/Monticello': -5,
    'America/Detroit': -5,
    'America/Menominee': -6,
    'America/St_Johns': -3,
    'America/Goose_Bay': -4,
    'America/Halifax': -4,
    'America/Moncton': -4,
    'America/Blanc-Sablon': -5,
    'America/Toronto': -5,
    'America/Winnipeg': -6,
    'America/Regina': -6,
    'America/Edmonton': -7,
    'America/Vancouver': -7,
    'America/Pangnirtung': -5,
    'America/Iqaluit': -5,
    'America/Resolute': -6,
    'America/Rankin_Inlet': -6,
    'America/Cambridge_Bay': -8,
    'America/Cancun': -6,
    'America/Merida': -6,
    'America/Matamoros': -6,
    'America/Monterrey': -6,
    'America/Mexico_City': -6,
    'America/Ojinaga': -7,
    'America/Chihuahua': -7,
    'America/Hermosillo': -7,
    'America/Mazatlan': -7,
    'America/Bahia_Banderas': -6,
    'America/Tijuana': -8,
    'America/Santa_Isabel': -8,
    'America/Antigua': -4,
    'America/Nassau': -5,
    'America/Barbados': -4,
    'America/Belize': -6,
    'Atlantic/Bermuda': -4,
    'America/Cayman': -5,
    'America/Costa_Rica': -6,
    'America/Havana': -5,
    'America/Santo_Domingo': -4,
    'America/El_Salvador': -6,
    'America/Guatemala': -6,
    'America/Port-au-Prince': -5,
    'America/Tegucigalpa': -6,
    'America/Jamaica': -5,
    'America/Martinique': -4,
    'America/Managua': -6,
    'America/Panama': -5,
    'America/Puerto_Rico': -4,
    'America/Miquelon': -3,
    'America/Grand_Turk': -5,
    'America/Argentina/Buenos_Aires': -3,
    'America/Argentina/Cordoba': -3,
    'America/Argentina/Salta': -3,
    'America/Argentina/Tucuman': -3,
    'America/Argentina/La_Rioja': -3,
    'America/Argentina/San_Juan': -3,
    'America/Argentina/Jujuy': -3,
    'America/Argentina/Catamarca': -3,
    'America/Argentina/Mendoza': -3,
    'America/Argentina/San_Luis': -3,
    'America/Argentina/Rio_Gallegos': -3,
    'America/Argentina/Ushuaia': -3,
    'America/La_Paz': -4,
    'America/Noronha': -2,
    'America/Belem': -3,
    'America/Santarem': -3,
    'America/Fortaleza': -3,
    'America/Recife': -3,
    'America/Araguaina': -3,
    'America/Maceio': -3,
    'America/Bahia': -3,
    'America/Sao_Paulo': -3,
    'America/Campo_Grande': -4,
    'America/Cuiaba': -4,
    'America/Porto_Velho': -4,
    'America/Boa_Vista': -4,
    'America/Manaus': -4,
    'America/Eirunepe': -5,
    'America/Rio_Branco': -5,
    'America/Santiago': -6,
    'America/Bogota': -5,
    'America/Curacao': -4,
    'America/Guayaquil': -6,
    'Atlantic/Stanley': -3,
    'America/Cayenne': -3,
    'America/Guyana': -3,
    'America/Asuncion': -4,
    'America/Lima': -5,
    'Atlantic/South_Georgia': -2,
    'America/Paramaribo': -3,
    'America/Port_of_Spain': -4,
    'America/Montevideo': -3,
  });

  return lib;
});
`;
