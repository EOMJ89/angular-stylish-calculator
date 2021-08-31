import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dm-calculator',
  templateUrl: './dm-calculator.component.html',
  styleUrls: ['./dm-calculator.component.css']
})
export class DmCalculatorComponent implements OnInit {
  // Number, operation and result variables.
  @Input() public num1: string | undefined;
  @Input() public num2: string | undefined;
  @Input() public operation: string | undefined;
  @Input() public result: number | undefined;

  // Division by Zero Warning
  @Input() public showWarning: boolean | undefined;

  // Event output with a string character.
  @Output() public sendCharacter = new EventEmitter<string>();

  /**
   * Grid of the button's content, for visuals and function variables when clicking.
   */
  public numbers = [['1', '2', '3', '+'],['4', '5', '6', '-'],['7', '8', '9', '*'], ['.', '0', 'c', '/']];

  ngOnInit(): void { }

  /**
   * Emits an event to the parent component with parameter character.
   * 
   * @param character string containing number from 0 to 9, '.', '+', '-', '*', '/' or '='
   */
  public emitSendCharacter(character: string) {
    // console.log(character)
    this.sendCharacter.emit(character);
  }
}
