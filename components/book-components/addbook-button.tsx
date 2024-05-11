'use client'
import { storage } from "@/firebaseConfig";
import { Button } from "../ui/button"
import { CreateBook } from "@/app/actions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4} from "uuid";

const handle = async () => {
   



    const inputTitle = document.getElementById('title') as HTMLInputElement;
    const inputDate = document.getElementById('date') as HTMLInputElement;
    const inputAuthor = document.getElementById('author') as HTMLInputElement;
    const inputPrice = document.getElementById('price') as HTMLInputElement;
    const inputQuantity = document.getElementById('quantity') as HTMLInputElement;
    const inputPublisher = document.getElementById('publisher') as HTMLInputElement;
    const inputImage = document.getElementById('image') as HTMLInputElement;
    const combobox = document.getElementById("genreCombobox") as HTMLInputElement;
    const  selectedValue = combobox.value;
    if(inputImage.files!= null)
        {
    const file = inputImage.files[0] ;
    if (file){
        const imgref = ref(storage,`files/${v4()}`)
        console.log(imgref)
        await   uploadBytes(imgref,file);
        const url =await getDownloadURL(imgref);
        
    CreateBook(inputTitle.value, new Date(inputDate.value), inputAuthor.value,
    Number(inputPrice.value), Number(inputQuantity.value), inputPublisher.value, url, Number(selectedValue))
        window.location.reload();
    }
}


}

const AddbookButton =  () =>{
    return  <Button onClick={handle}>submit</Button>
}

export{AddbookButton}