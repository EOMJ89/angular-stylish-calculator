import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sm-calculator',
  templateUrl: './sm-calculator.component.html',
  styleUrls: ['./sm-calculator.component.css']
})
export class SmCalculatorComponent implements OnInit {
  private _modifyingNum1OrNum2 : boolean = false; // false is num1, true is num2

  public num1: string = '';
  public num2: string = '';
  public operation: string = '';
  public result: number | undefined = undefined;

  private _equalsWasLastCharacter: boolean = false;
  public triedDivisionByZero: boolean = false;

  constructor() { }

  /**
   * Sets the initial values for variables on init.
   */
  ngOnInit(): void {
    this._resetVariables();
  }

  /**
   * Resets the variables to their initial values.
   */
  private _resetVariables(): void {
    this._modifyingNum1OrNum2 = false;
    this.num1 = '';
    this.num2 = '';
    this.operation = '';
    this.result = undefined;
    this._equalsWasLastCharacter = false;
  }

  /**
   * Event function that receives a character to process and add to the numbers string.
   * Contains the logic to fire the operations and get the result when characters are '+', '-', '*', '/' or '='.
   * @param character the character to process.
   */
  public getCharacter(character: string): void {
    // Reset the division by Zero alert
    if(this.triedDivisionByZero == true) {
      this.triedDivisionByZero = false;
      this._resetVariables();
      
      if(character == '+' || character == '-' ||
         character == '*' || character == '/' ||
         character == '=') {
        return;
      }
    }

    // Process the character
    switch(character) {
      // Operations
      case '*':
      case '/':
      case '-':
      case '+':
      {
        this._processOperation(character);
        break;
      }
      // Equals
      case '=': {
        this.result = this._processEquals();

        if(parseFloat(this.num2) == 0) {
          this._keepLastResult();
        }
        break;
      }
      // Clean / Reset
      case 'c': {
        this._resetVariables();
        break;
      }
      // Default means the input is a number from 0 to 9 or a '.' for a decimal
      default: {
        if (this._equalsWasLastCharacter) {
          this._resetVariables();
        }

        if(!this._modifyingNum1OrNum2) {
          this.num1 = this._addToNumber(this.num1, character);
        } else {
          this.num2 = this._addToNumber(this.num2, character);
        }
        break;
      }
    }

  }

  /**
   * Prints the variable's values on the console - FOR TESTING PURPOSES.
   */
  private _debug(): void {
    console.log({
      '_modifyingNum1OrNum2': this._modifyingNum1OrNum2,
      'num1': this.num1,
      'num2': this.num2,
      'operation': this.operation,
      'result': this.result,
      'triedDivisionByZero': this.triedDivisionByZero
    });
  }

  /**
   * Process the character for a matematical operation,
   * keeping the last result if the last character was '=' (equals),
   * then changes the current number being modified.
   * @param operation operation chararter (only works with '+', '-', '*' or '/')
   */
  private _processOperation(operation: string): void {
    // Keep last result in case multiple operations are being done in chain
    if (this._equalsWasLastCharacter == true) {
      this._keepLastResult();
    }

    // Sets the operation variable
    this.operation = operation;

    // Changes the number that is being modified ONLY if the first number is not empty
    if(this.num1 != '') {
      this._modifyingNum1OrNum2 = true;
    }
  }

  /**
   * Process the final operation based on the current character in the 'operation' component variable.
   * Prevents empty numbers from being used by transforming them to 0.
   * 
   * @returns the result of the operation selected between the two numbers in storage.
   */
  private _processEquals(): number {
    if(this.num1 == '' && this.num2 == '') {
      return 0;
    }

    // Sets the default operation as "+"
    if(this.operation == '') {
      this.operation = '+';
    }

    // Prevent parsing errors by making them decimal if empty
    if(this.num1 == '' || this.num1 == '0.') {
      this.num1 = '0.0';
    }
    if(this.num2 == '' || this.num2 == '0.') {
      this.num2 = '0.0';
    }

    this._equalsWasLastCharacter = true;
    // Result the result of the operation
    return this._calculateResult(this.operation, this.num1, this.num2);
  }

  /**
   * Process the character before adding it to the current number variable being modifying.
   * 
   * @param n string variable from the current number being modified.
   * 
   * @param c character to add onto the current number being modified.
   * 
   * @returns the number with the character added and without extra decimal points.
   */
  private _addToNumber(n: string, c:string): string {
    // Adds a '0' in case the string is empty and the character is a decimal point, to prevent parsing issues.
    if(n == '' && c == '.') {
      n += '0';
    }
    
    // Removes duplicated decimal points if they exist.
    return this._trimExtraDots(n += c);
  }

  /**
   * Removes duplicated decimal points, keeping only the first one, prevents parsing issues when converting strings.
   * 
   * @param n number string to trim.
   * 
   * @returns number string with only the first decimal point but all the numerical characters.
   */
  private _trimExtraDots(n: string): string {
    // If there's no decimal point, stop processing the string.
    if (!n.includes('.')) {
      return n;
    }

    let auxReturn: string = '';
    // Get the index of the first decimal point.
    let firstDot: number = n.indexOf('.');

    let i: number;
    for(i = 0; i < n.length; i++) {
      // Ignore decimal points that are not in the index position collected by "indexOf".
      if(n[i] == '.' && i != firstDot) {
        continue;
      }

      // Add all other characters, including the first decimal point.
      auxReturn += n[i];
    }

    return auxReturn;
  }

  /**
   * Parse the numbers and get the result of the desired operation.
   * 
   * @param operation operation character (only '+', '-', '*' or '/').
   * 
   * @param num1 first number of the operation.
   * 
   * @param num2 second number of the operation.
   * 
   * @returns the result of the operation via another function.
   */
  private _calculateResult(operation: string, num1: string, num2: string): number {
    // Parse the numbers to float as fail safe.
    let n1 = parseFloat(num1);
    let n2 = parseFloat(num2);

    // Call the _getResult function
    return this._getResult(operation, n1, n2);
  }

  /**
   * Calculates the result of the desired operation between two numbers.
   * 
   * @param operation the operation character.
   * 
   * @param num1 the first number, already parsed as number.
   * 
   * @param num2 the second number, already parsed as number.
   * 
   * @returns the result of the operatin, as number.
   */
  private _getResult(operation: string, num1: number, num2: number): number {
    let auxReturn: number = 0.0;

    switch (operation) {
      case '+': {
        auxReturn = num1 + num2;
        break;
      }
      case '-': {
        auxReturn = num1 - num2;
        break;
      }
      case '*': {
        auxReturn = num1 * num2;
        break;
      }
      default: { // '/'
        // Special condition for the division to prevent errors.
        if (num2 == 0.0) {
          this.triedDivisionByZero = true;
        } else {
          auxReturn = num1 / num2;
        }
        break;
      }
    }

    // Cuts the number after 9 decimals after the dot.
    return parseFloat(auxReturn.toFixed(9));
  }

  /**
   * Takes the value from the result variable and sets it to the first number of the operation
   * and automatically sets the modifying number to the second one to allow chained operations.
   */
  private _keepLastResult(): void {
    // Recalculates the result to prevent losing it.
    this.result = this._calculateResult(this.operation, this.num1, this.num2);

    let n1: string = this.result.toString();
    
    // Resets the variables to prevent errors
    this._resetVariables();
    // Sets the first number as the result and sets the modifying number to num2.
    this.num1 = n1;
    this._modifyingNum1OrNum2 = true;
  }
}
