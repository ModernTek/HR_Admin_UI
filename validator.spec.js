describe('validator module', function() {
  describe('.isEmailAddress', function() {
    it('should return true for valid emails', function() {
      expect(validator.isEmailAddress('joe@example.com')).toBeTruthy()
    })
    it('should return false for invalid emails', function() {
      expect(validator.isEmailAddress('joe.example.com')).toBeFalsy('an email address has one @ symbol')
      expect(validator.isEmailAddress('joe@example@com')).toBeFalsy('an email address does not have more than one @ symbol')
      expect(validator.isEmailAddress('joe.example')).toBeFalsy('an email address must belong to a valid domain')
    })
  })

  describe('.withoutSymbols', function() {
    it('removes non-alphanumeric characters from a string', function() {
      expect(validator.withoutSymbols("Hi, john.doe@live.com., is that you?/")).toEqual('Hi johndoelivecom is that you')
      expect(validator.withoutSymbols("Where were you on 1st of this Monday?")).toEqual('Where were you on 1st of this Monday')
    })
  })

  describe('.isDate', function() {
    it('returns false for invalid dates', function() {
      expect(validator.isDate(null)).toBeFalsy('null is not a date')

    })
    it('returns true for valid dates', function() {
      expect(validator.isDate('20 January 2017')).toBeTruthy()
    })
  })

  describe('.isBeforeDate', function() {
    it('throws an error if one of the dates is not valid', function() {
      var d1 = new Date('11 January 2004'),
        d2 = 'another date'
      expect(function() {
        validator.isBeforeDate(d1, d2)
      }).toThrow('both arguments must be valid dates')
      expect(function() {
        validator.isBeforeDate(d2, d1)
      }).toThrow('both arguments must be valid dates')
    })

    it('returns true if the input comes before the reference', function() {
      var input = new Date('11 January 2004'),
        reference = new Date('12 January 2004')
      expect(validator.isBeforeDate(input, reference)).toBeTruthy()
    })

    it('returns false if the reference date comes before the input', function() {
      var input = new Date('13 January 2004'),
        reference = new Date('12 January 2004')
      expect(validator.isBeforeDate(input, reference)).toBeFalsy()
    })
  })

  describe('.isAfterDate', function() {
    it('throws an exception if one of the dates is not a valid date', function() {
      var d1 = new Date('11 January 2004'),
        d2 = 'another date'
      expect(function() {
        validator.isAfterDate(d1, d2)
      }).toThrow('both arguments must be valid dates')
      expect(function() {
        validator.isAfterDate(d2, d1)
      }).toThrow('both arguments must be valid dates')
    })

    it('returns true if the input comes after the reference', function() {
      var input = new Date('13 January 2004'),
        reference = new Date('12 January 2004')
      expect(validator.isAfterDate(input, reference)).toBeTruthy()
    })

    it('returns false if the input comes before the reference', function() {
      var input = new Date('11 January 2004'),
        reference = new Date('12 January 2004')
      expect(validator.isAfterDate(input, reference)).toBeFalsy()
    })
  })

  describe('.isBeforeToday', function() {
    it('throws an exception if one of the dates is not a valid date', function() {
      var d1 = new Date('11 January 2004')
      expect(function() {
        validator.isBeforeToday(d1)
      }).toThrow('argument must be a valid date')
    })

    it('returns true if the date comes before today', function() {
      var date = new Date('11 January 2004')
      expect(validator.isBeforeToday(date)).toBeTruthy()
    })

    it('returns false the date comes after today', function() {
      var date = new Date()
      date.setHours(date.getHours() + 12)
      expect(validator.isBeforeToday(date)).toBeFalsy()
    })
  })

  describe('.isEmpty', function() {
    it('returns false if the string has some characters or is null', function() {
      expect(validator.isEmpty("Visiting new places is fun.")).toBeTruthy()
    })
    it('returns false if the string is empty or has only spaces', function() {
      expect(validator.isEmpty("")).toBeTruthy()
      expect(validator.isEmpty(' ')).toBeTruthy()
      expect(validator.isEmpty('      ')).toBeTruthy()
    })
  })

  describe('.contains', function() {
    it('returns true if the string contains one of the words', function() {
      expect(validator.contains('"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"])).toBeTruthy('should ignore case')
      expect(validator.contains("Visiting new places is fun.", ["places"])).toBeTruthy()
    })
    it('returns false if the string does not contain any one of the words', function() {
      expect().toBeFalsy()
      expect(validator.contains("Visiting new places is fun.", ["aces"])).toBeFalsy()
      expect(validator.contains("Visiting new places is fun.", ["coconut"])).toBeFalsy()
    })
  })

  describe('.lacks', function() {
    it('returns true if the string does not contain any of the words', function() {
      expect(validator.lacks("Visiting new places is fun.", ["coconut"])).toBeTruthy()
      expect(validator.lacks("Visiting new places is fun.", ["aces"])).toBeTruthy()
    })
    it('returns false if the string contains any of the words', function() {
      expect(validator.lacks("Visiting new places is fun.", ["places"])).toBeFalsy()
      expect(validator.lacks('"Definitely," he said in a matter-of-fact tone.', ["matter", "definitely"])).toBeFalsy()
    })
  })

  describe('.isComposedOf', function() {
    it('returns true if the string only contains the words in the array', function() {
      expect(validator.lacks("10184", ["1", "2", "3", "4", "5", "6" ,"7", "8", "9", "0"])).toBeTruthy()
      expect(validator.lacks("I am ready.", ["I", "I'm", "am", "not", "ready"])).toBeTruthy()
      expect(validator.lacks("Iamnotready.", ["I", "I'm", "am", "not", "ready"])).toBeTruthy()
    })
    it('returns false if the string contains words other than those in the words array', function() {
      expect(validator.lacks("I am ready. Here I come", ["I", "I'm", "am", "not", "ready"])).toBeFalsy()
    })
  })

  describe('.isLength', function() {
    it('returns true if the length of the string is less than or equal to n', function() {
      expect(validator.isLength("123456789", 20)).toBeTruthy()
      expect(validator.isLength("AHHHH", 25)).toBeTruthy()
      expect(validator.isLength("This could be a tweet!", 140)).toBeTruthy()
    })
    it('returns false if the length of the string is greater than n', function() {
      expect(validator.isLength("123456789", 6)).toBeFalsy()
    })
  })

  describe('.isOfLength', function() {
    it('returns true if the string length is greater than or equal to n', function() {
      expect(validator.isOfLength("123456789", 6)).toBeTruthy()
    })
    it('returns false if the string length is less than n', function() {
      expect(validator.isOfLength("123456789", 20)).toBeFalsy()
      expect(validator.isOfLength("AHHHH", 25)).toBeFalsy()
      expect(validator.isOfLength("This could be a tweet!", 140)).toBeFalsy()
    })
  })

  describe('.countWords', function() {
    it('counts string words', function() {
      expect(validator.countWords("Hello.")).toEqual(1)
      expect(validator.countWords("Hard-to-type-really-fast!")).toEqual(5)
      expect(validator.countWords("supercalifragilisticexpialidocious")).toEqual(1)
    })
    it('returns 0 zero for empty strings', function() {
      expect(validator.countWords("")).toEqual(0)
    })
  })

  describe('.lessWordsThan', function() {
    it('returns true when the count is less or equal to "n"', function() {
      expect(validator.lessWordsThan('there are very few words here', 6)).toBeTruthy()
    })

    it('returns false when the count is more than "n"', function() {
      expect(validator.lessWordsThan('there are very few words here', 3)).toBeFalsy()
    })
  })

  describe('.moreThanWords', function() {
    it('returns true when the count is greater than or equal to "n"', function() {
      expect(validator.moreWordsThan('there are very few words here', 5))
    })
    it('returns false when the count is less than "n"', function() {
      expect(validator.moreWordsThan('there are very few words here', 12))
    })
  })

  describe('.isBetween', function() {
    it('returns true for words within range', function() {
      expect(validator.isBetween('these words fit within a certain range', 5, 7)).toBeTruthy()
    })
    it('returns false for words outside the range', function() {
    expect(validator.isBetween('these words fit within a certain range', 7, 12)).toBeTruthy()
    })
  })

  describe('.isAlphanumeric', function() {
    it('returns true when string is "a-zA-Z0-9" only', function() {
      expect(validator.isAlphanumeric('this string contains 6 words')).toBeTruthy()
    })
    it('returns false when there are characters besides "a-zA-Z0-9"', function() {
      expect(validator.isAlphanumeric('this string may contains some symbols besides "a-zA-Z0-9"')).toBeFalsy()
    })
  })

  describe('.isCreditCard', function() {
    it('returns true for valid credit cards', function() {
      expect(validator.isCreditCard("1234-5678-9101-1121")).toBeTruthy()
      expect(validator.isCreditCard("1234567891011121")).toBeTruthy()
      expect(validator.isCreditCard("4427A693CF324D14")).toBeTruthy()
      expect(validator.isCreditCard("4427-A693-CF32-4D14")).toBeTruthy()
    })
    it('returns false for invalid credit cards', function() {
      expect(validator.isCreditCard("testcard")).toBeFalsy()
      expect(validator.isCreditCard("----------------")).toBeFalsy()
    })
  })

  describe('.isHex', function() {
    it('returns true for valid hex colors', function() {
      expect(validator.isHex("#abcdef")).toBeTruthy()
      expect(validator.isHex("#bbb")).toBeTruthy()
      expect(validator.isHex("#1cf")).toBeTruthy()
      expect(validator.isHex("#1234a6")).toBeTruthy()
    })
    it('returns false for invalid hex colors', function() {
      expect(validator.isHex("#bcdefg")).toBeFalsy()
      expect(validator.isHex("#1234a68")).toBeFalsy()
      expect(validator.isHex("cc4488")).toBeFalsy()
    })
  })

  describe('.isRGB', function() {
    it('returns true for valid rgb colors', function() {
      expect(validator.isRGB("rgb(0,0,0)")).toBeTruthy()
      expect(validator.isRGB("rgb(0, 0, 0)")).toBeTruthy()
      expect(validator.isRGB("rgb(255, 255, 112)")).toBeTruthy()
    })
    it('returns false for invalid rgb colors', function() {
      expect(validator.isRGB("rgba(0,0,0, 0)")).toBeFalsy()
      expect(validator.isRGB("rgb(0,300,0)")).toBeFalsy()
      expect(validator.isRGB("rgb(0,-14,0)")).toBeFalsy()
    })
  })

  describe('.isHSL', function() {
    it('returns true for valid hsl numbers', function() {
      expect(validator.isHSL('hsl(122, 1, 1)')).toBeTruthy()
    })
    it('returns false for invalid hsl numbers', function() {
      expect(validator.isHSL('hsl(420, 0.5, 0.5)')).toBeFalsy()
    })
  })

  describe('.isColor', function() {
    it('returns true for valid colors', function() {
      expect(validator.isColor("#ccccff")).toBeTruthy()
      expect(validator.isColor("rgb(255,255,200)")).toBeTruthy()
      expect(validator.isColor("hla(46,0.66,0.21)")).toBeTruthy()
      expect(validator.isColor("#363")).toBeTruthy()
    })
    it('returns false for invalid colors', function() {
      expect(validator.isColor("hla(255,255,255)")).toBeFalsy()
      expect(validator.isColor("abc345")).toBeFalsy()
    })
  })

  describe('.isTrimmed', function() {
    it('returns true if the string does not have extra whitespace', function() {
      expect(validator.isTrimmed("harmony and irony")).toBeTruthy()
    })
    it('returns false if the string has extra whitespace', function() {
      expect(validator.isTrimmed("   harmony and irony")).toBeFalsy()
      expect(validator.isTrimmed("harmony and irony      ")).toBeFalsy()
      expect(validator.isTrimmed("harmony  and  irony")).toBeFalsy()
    })
  })

})
