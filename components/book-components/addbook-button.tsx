'use client'
import { Button } from "../ui/button"
import { CreateBook } from "@/app/actions";
const handle = () => {
   
    const inputTitle = document.getElementById('title') as HTMLInputElement;
    const inputDate = document.getElementById('date') as HTMLInputElement;
    const inputAuthor = document.getElementById('author') as HTMLInputElement;
    const inputPrice = document.getElementById('price') as HTMLInputElement;
    const inputQuantity = document.getElementById('quantity') as HTMLInputElement;
    const inputPublisher = document.getElementById('publisher') as HTMLInputElement;
    const inputImage = document.getElementById('image') as HTMLInputElement;
    const combobox = document.getElementById("genreCombobox") as HTMLInputElement;
    const  selectedValue = combobox.value;
    
    CreateBook(inputTitle.value, new Date(inputDate.value), inputAuthor.value,
        Number(inputPrice.value), Number(inputQuantity.value), inputPublisher.value, inputImage.value, Number(selectedValue))




}

const AddbookButton =  () =>{
    return  <Button onClick={handle}>submit</Button>
}

export{AddbookButton}