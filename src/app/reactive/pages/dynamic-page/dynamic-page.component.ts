import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm:FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)], []],
    favoriteGames: this.fb.array([
      ['Habbo', [Validators.required, Validators.minLength(3)]],
      ['Stardew Valley', [Validators.required]]
    ])
  })

  constructor(private fb:FormBuilder){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray
  } 

  get favoriteGames2(){
    return this.myForm.controls['favoriteGames'] as FormArray
  } 

  isvalidField(field:string): boolean | null{
    return this.myForm.controls[field].errors 
    && this.myForm.controls[field].touched
  }

  isValidFieldInArray(formArray: FormArray, i:number){
    return formArray.controls[i].errors 
    && formArray.controls[i].touched
  }

  getFieldError(formArray: FormArray, i:number): string | null {
    if (!formArray ) return null
    
    const errors = formArray.controls[i].errors  || {}

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return "Debe tener mínimo 3 letras"  
        default:
          return null
      }
    }
    return null
  }

  onDeleteGame(formArray:FormArray, i:number){
    formArray.removeAt(i)
  }

  public newFavorite:FormControl = new FormControl ('', [Validators.required], [])

  onNewGame(){
    if (this.newFavorite.invalid) return

    const newGame = this.newFavorite.value

    // this.favoriteGames.push(new FormControl (newGame, [Validators.required]))

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    )

    this.newFavorite.reset()
  }



  onSubmit():void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return}

    console.log(this.myForm.value)
    this.myForm.reset()
    this.myForm.controls['favoriteGames'] = this.fb.array([])
  }

}
