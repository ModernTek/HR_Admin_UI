
//Create JavaScript Validation Functions.

//var validator = (function(window){

 (function(window) {
  var validator = {};

  validator.isEmailAddress = function(input) {

  	/* Checks if the input parameter is an email address,
  	 * consisting of three parts; An email address consists
  	 * of two strings combined by an @ symbol.
  	 */
  	
 	    input = input || '';
 	    var atIndex = input.indexOf('@');
 	    return atIndex > 0 && atIndex < input.length - 1 && 
 	           atIndex === input.lastIndexOf('@');

   }
/*****************************************************************/ 

 validator.isPhoneNumber = function(input){

     /* Checks if the input parameter is a valid phone number
 	    * for your country.
 	    */

 	    /* Assuming that format written this way  1-NPA-NXX-XXXX which includes
       1 for long distance call. */
      var parts = input.split('-');     
     
      //If parts is not equal to four, telephone number is wrong
      valid = (parts.length === 4) ;
      if (valid){
          //If first digit is not equal to 1, then it is wrong value for 
          //United States.
          valid = (parseInt(parts[0]) === 1);
      } 
      if (valid){
          var areaCode = parts[1], firstThree = parts[2], lastFour = parts[3];
         
          //If length of area code is equal to three and all characters are 
          //numbers, then this is valid
          valid = (areaCode.length === 3 ) && (!isNaN(parseInt(areaCode)));  
          if (valid){
             // The last two characters of area code should not be equal to 11 and
             // first digit of area code should not be more or equal to two.
             valid = (areaCode.substr(1,2) != 11) && (areaCode.substr(0,1) >= 2);      
          }
          if (valid){
              //If length of first three numbers is equal to three and all 
              //characters are numbers, then this is valid
              valid = (firstThree.length === 3)  && (!isNaN (parseInt(firstThree)));
          }     
          if (valid) {
              //If length of last four numbers is equal to four and all characters
              // are numbers, then this is valid
              valid = (lastFour.length === 4 )  && (!isNaN (parseInt(lastFour)) );
          }
      }   
    
      return valid;
    }

/*************************************************************************/
  validator.withoutSymbols = function(input){

    /* Returns the input parameter text with all symbols removed.
     * Symbols refer to any non-alphanumeric character. A character is
     * considered alphanumeric if it matches one of the following:
     * a-z, A-Z, or 0-9. Ignore white space.
     */ 

	    var alphaNum = 
	    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    var nosymbols = "";
      for (var i = 0; i < input.length - 1; i++){
          if (alphaNum.indexOf(input.charAt(i)) !== -1 ||
    	        input.charAt(i) === " ")
              nosymbols += input.charAt(i);
      }
      return nosymbols;
   } 
/*************************************************************************/
  
  validator.isDate = function(input){
     
    /* Checks if the input parameter text is a valid date. For your
     * purposes , a valid date is any string that can be turned into
     * JavaScript Date Object.
     */
 
      return !isNaN(Date.parse(input));   
  } 

/*************************************************************************/

validator.isBeforeDate = function(input, reference){
   
  /* Checks if the input parameter is a date that comes after the
   * reference date. Both the input and the reference can be strings
   * or Date Objects. This function relies on two valid dates; if two
   * are not found, it should throw a new error.
   */
     if (isNaN(Date.parse(input)) || isNaN(Date.parse(reference))){
	     console.log("Input parameter or reference parameter is not a Date");
	     return false;
	   }
	   var firstDate = new Date(input);
	   var secondDate = new Date(reference);
	   return firstDate.getTime() < secondDate.getTime();
	
 }

/**************************************************************************/

validator.isAfterDate = function(input, reference) {

  /* Checks if the input parameter is a date that comes before
   * the reference date. Both the input and the reference can be strings 
   * or Date Objects. This function relies pn two valid dates;
   * if two are not found, it should throw a new error.
   */
      if (isNaN(Date.parse(input)) || isNaN(Date.parse(reference))){
	        console.log("Input parameter or reference parameter is not a Date");
	        return false;
      }
      var firstDate = new Date(input);
      var secondDate = new Date(reference);

      return firstDate.getTime() >secondDate.getTime();
  }

/***************************************************************************/

validator.isBeforeToday = function (input) {
  
  /* Checks if the input parameter is a date that comes after 
   * today. The input can be either a string or a Dtae Onject. This
   * function relies on one valid date; if one is not found, it should 
   * throw a new error.
   */

   if (isNaN(Date.parse(input))){

	 console.log("Input parameter is not a Date");
     return false;
   }
   var today = new Date().getTime();
   var inputDate = new Date(input).getTime();
   return today > inputDate;
}

/***************************************************************************/

validator.isAfterToday = function (input) {
  
  /* Checks if the input parameter is date that comes after today
   * The input can be either s string or a Date Object. This
   * function relies on one valid date; if one is not found, it should throw
   * a new error.
   */

   if (isNaN(Date.parse(input))){

	 console.log("Input parameter is not a Date");
	 return false;
	}
	var today = new Date().getTime();
	var inputDate = new Date(input).getTime();
	
	return today < inputDate;
} 
/*****************************************************************************/

validator.isEmpty = function (input) {

	/* Checks the input parameter and returns true if it is an empty
	 * string -a string with no length or characters that is
	 * represented as "" or only contaons whitespace(s).
	 */

	 return (input === null || input.trim().length === 0);

}

/*****************************************************************************/

validator.contains = function (input, words) {

	/* Checks if the input text parameter contains one or more of the
	 * words within the words array. A word is defined as the following:
	 * having undefined, whitespace, or punctuation before and after it.
	 * The function should be case-insensitive.
	 */

	 var nosymbols = validator.withoutSymbols(input);
	 nosymbols = nosymbols.toLowerCase();
     for (var i = 0; i < words.length; i++){
         var ind = nosymbols.indexOf(words[i]);
         if  (nosymbols.indexOf(words[i]) !== -1 &&
             (nosymbols.charAt(ind-1)===" "       ||
              nosymbols.charAt(ind + words[i].length) === " ")) {
             return true;
        } 
        else {
              
             return false;
        }
       
    }
}

/******************************************************************************/

validator.lacks = function(input, words) {

	/* Checks if the input yexy parameter does not contain any of the words
	 * wirhin the words array. Use the "word" definition used in the
	 * above .contains descrition. The function should be case-insensituve.
	 * A function like this could be used for checking blacklisted words.
	 */

   var nosymbols = validator.withoutSymbols(input);
	 nosymbols = nosymbols.toLowerCase();

	 for (var i = 0; i < words.length; i++){
        var ind = nosymbols.indexOf(words[i]);
        if (nosymbols.indexOf(words[i]) !== -1 &&
           (nosymbols.charAt(ind-1) === " "     &&
            nosymbols.charAt(ind + words[i].length) === " ")) {
            return false;
        } 
        else {
              
             return true;
        }
       
    }
}
/*****************************************************************************/

validator.isComposedOf = function (input, strings){

	/* Checks that the input text parameter contains only strings 
	 * found wirhin the strings array. Note that this function 
	 * doesn't use a strong word definition the way .contains and
	 * .lacks does. The function should be case-insensitive.
	 */

    var l = strings.length;
    var longest;
    var matched;
    var newStr = input.toLowerCase();

    // sort array
    for(var i = 0; i < l; i++) {
        longest = i;
        // compare arr[longest] to every element that comes after it
        for(var j = i + 1; j < l; j++) {

            // if next item is < than current longest, next = new longest
            if(strings[j].length > strings[longest].length) {
                longest = j;
            }
        }
        // if longest and i are not the same, swap the values in the array
        if(longest !== i) {
            var temp = strings[i];
            strings[i] = strings[longest];
            strings[longest] = temp;
        }
     }
  
     // loop through array and remove from string
     for(var i = 0; i < l; i++) {
        if(!newStr.length) {
            return true;
        } else {
            matched = strings[i].toLowerCase();
            newStr = newStr.replace(matched, '');
        }
     }
     return newStr.length ? false : true;
   }

/******************************************************************************/

validator.isLength = function (input, n){

	/* Checks if the input parameter's character count is less than
	 * or equal to the n parameter.
	 */

	 return input.length <= n ? true:false;

}

/******************************************************************************/

validator.isOfLength = function (input, n) {

	/* Checks if the parameter's character count is greater than or equal 
	 * to the n parameter.
	 */

	 return input.length >= n ? true:false;

}

/******************************************************************************/

validator.countWords = function (input) {
	
	/* Check the number of words in the input parameter.
	 * Refer to the definition of word used in the description 
	 * of the .contains function.
	 */

	var alphaNum = 
	   'ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz0123456789';
	
	var word = "", pos = 0, wordCount = 0;
	
	for (var i = 0; i < input.length; i++){
		
		if (alphaNum.indexOf(input.charAt(i)) === -1 ||
		    input.charAt(i) === " ") {
			      word = input.substr(pos, i);		    
		    pos = i + 1;
		    
		    if (word.length > 0) wordCount++;

		}
	}   

return wordCount;
}

/******************************************************************************/

validator.lessWordsThan = function (input, n){
	
	/* Checks if the input parameter has a word count less than or
	 * equal to the n parameter.
	 */

	 return validator.countWords(input) <= n ? true : false; 

}

/******************************************************************************/

validator.moreWordsThan = function (input, n) {

	/* Checks if the input parameter has a word count greater 
	 * than or equal to the n parameter.
	 */

	 return validator.countWords(input) >= ? true : false;

}  

/*****************************************************************************/

validator.isBetween = function (input, floor, ceil) {

	/* Checks that the input parameter matches all of the following:
     *
     *   - input is greater than or equal to the floor parameter
     *   - input is less than or equal to the cell parameter.
     *
     */

     if (isNaN(input)){

	 	  console.log("input is not numeric");
	      return false;
	 }
	 return (input >= floor) && (input <= ceil) ? true : false;
}

/******************************************************************************/

validator.isAlphanumeric = function (input) {

	/* Checks that the input parameter string is only composed of the
	 * following characters: a-z, A-Z, or 0-9. Unicode characters are 
	 * intetionally disgarded.
	 */

	 var code, i;

	 for  (i = 0; i < input.length; i++){

		 code = input.charCodeAt(i);

		 if (!(code > 47 && code < 58)  &&   // numeric (0-9)
			   !(code > 64 && code < 91)  &&  // upper alpha (A-Z)
			   !(code > 96 && code < 123)) { // lower alpha (a-z)
			
			 return false; 

		}
	}
	return true;
}

/******************************************************************************/

validator.isCreditCard = function (input) {

	/* Checks if the input parameter is a credit actd or bank card
	 * number. A credit card number will bedefineed as four sets of
	 * four alphanumeric characters separated by hyphens (-), or
	 * a sungle string of alhanumeric characters (without hyphens).
	 */

	var alphaNum = 
	'ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz0123456789';
    
    var checkString="";

    var parts = input.split("-");
    
    //Check whether input has dashes
    if (parts.length === 1){

    	//No dashes check length of the string
    	if (input.length !== 16) return false;
    	  
    	
    } else{
          if (parts.length === 4){

    	   //We have dashes on input.
    	   //Check length of each part

    	       for (var k = 0; k < parts.length; k++){

    		       if (parts[k].length !== 4) return false;
    	       }
    	   }    
     }
     checkString = parts.join("");
     
     for (var m = 0; m < checkString.length; m++){
    	 if (aplhaNum.indexOf(checkString.charAt(m)) === -1) return false;
    			
     }
    	    
    return true;
}

/******************************************************************************/

validator.isHex = function (input) {

  /* Checks if the input string is a hexdecimal color, such as #3677bb.
   * Hexadecimal colors are strings with length of 7 (including the #)
   * using the characters 0-9 and A-F. isHex should also work on
   * shorthand hexadecimal collors, such as #333. The input must start
   * with a # to be considered valid.
   */

   var hexChar = "abcdef0123456789";
   
   var inputHex = input.substr(1);
  
   if ( (input.substr(0,1) === '#')  &&                    
       ((inputHex.length === 3) ||
        (inputHex.length === 6)) )  {
     
       for (var i = 0; i < inputHex.length; i++){
           if (hexChar.indexOf(inputHex[i]) !== -1)
               return true;
       }
   } 
   return false; 

} 

/**************
****************************************************************/

validator.isRGB = function (input) {

  /* Checks if the input is an RGB color, such as rgb(200, 26, 131).
   * An RGB color consists of:
   *    - Three numbers between 0 and 255
   *    - A comma between each number
   *    - The three numbers should be contained within "rgb(" and ")".
   */

    var rgbNums = input.substring(4, input.length - 1);

    var rgbArr = rgbNums.split(","); 

    return ((input.substr(0,4) === "rgb(")         && 
            (input.lastIndexOf(")") !== -1)        &&
            (rgbArr.length ===3)                   &&
            (rgbArr[0] >= 0) && (rgbArr[0] <= 255) &&
            (rgbArr[1] >= 0) && (rgbArr[1] <= 255) &&
            (rgbArr[2] >= 0) && (rgbArr[2] <= 255) ) 
}

/******************************************************************************/

validator.isHSL = function (input) {

  /* Checks if the input string is an HSL color, such as hsl(122, 1, 1)
   * An HSL color consists of:
   *   -  Three numbers:
   *      - the first number, Hue, is between 0 and 360
   *      - the second and third numbers, Saturation and Lightness,
   *        are between 0 and 1
   *   -   A comma between each number
   *   -   The three numbers should be contained within "hs(" and ")".
   */

   var hslNums = input.substring(4, input.length - 1);
   
   var hslArr = hslNums.split(","); 
   
   return ((input.substr(0,4) === "hsl(")        && 
           (input.lastIndexOf(")") !== -1)       &&
           (hslArr.length ===3)                  &&
           (hslArr[0] >= 0 && hslArr[0] <= 360)  &&
           (hslArr[1] >= 0 && hslArr[1] <= 1)    &&
           (hslArr[2] >= 0 && hslArr[2] <= 1) );   
}

/******************************************************************************/

validator.isColor = function (input){

  /* Checks if the input parameter is a hex, RGB, or HSL color type
   */
    
   var colorType = "";
   if (input.substr(0,1) === "#" &&
       (input.substr(1) === 6 || input.substr(1).length === 3 )) {
       colorType = "hex";
   }else {
       colorType = input.substr(0,3);
   }    
   return colorType === "rgb" ? validator.isRgb(input) : colorType === "hsl"
                              ? validator.isHsl(input) : colorType === "hex" 
                              ? validator.isHex(input) : false;

 } 

/******************************************************************************/

validator.isTrimmed = function(input) {

  /* Checks if the input parameter has leading or trailing
   * whitespaces or too many spaces between words. Leading refers to
   * before while trailing refers to after. This function will help validate
   * cases where extra spaces were added accidentally by the user.
   */

   var splitted = input.split(' ');
   var countws=0;
   for (var i = 0; i < splitted.length; i++){
       if ( splitted[i] === "") countws++;
   }
   return countws === 0 ? true : false;
 }
 


 window.validator = validator; 
 //return validator;

})(window);
