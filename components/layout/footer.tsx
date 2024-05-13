import { PiPhone } from "react-icons/pi";
import Link from "next/link"
import { IoMailOutline } from "react-icons/io5";
import { AiOutlineFacebook, AiOutlineForm, AiOutlineHome, AiOutlinePlayCircle, AiOutlineTikTok, AiOutlineTwitter } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="bg-[#f9f9f9] pt-14 pb-32 bg-left-bottom bg-repeat-x" style={{backgroundImage: `url('/image/footer.png')`}}>
            <div className={' relative z-10 container grid lg:grid-cols-4 gap-8 '}>
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <h4 className="font-bold text-2xl">Contact</h4>
                    <div className="flex flex-col gap-4">
                        <div className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineHome className="x-6 h-6"/>
                            <span>327 Nguyen Van Cu street, 5 District, Ho Chi Minh City</span>
                        </div>
                        <div className={'flex items-center text-gray-700 gap-3'}>
                            <PiPhone className="x-6 h-6"/>
                            <span>1900 1588</span>
                        </div>
                        <div  className={'flex items-center text-gray-700 gap-3'}>
                            <IoMailOutline className="x-6 h-6"/>
                            <span>bibliopolis.customerservice@gmail.com</span>
                        </div>
                        
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-1">
                    <h4 className="font-bold text-2xl">Policy</h4>
                    <div className="flex flex-col gap-4">
                        <Link href={'/policy'} className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineForm className="x-6 h-6"/>
                            <span>Warranty policy</span>
                        </Link>
                        <Link href={'/policy'} className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineForm className="x-6 h-6"/>
                            <span>Customer service policy</span>
                        </Link>
                        <Link href={'/policy'} className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineForm className="x-6 h-6"/>
                            <span>Return policy within 30 days</span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-1">
                    <h4 className="font-bold text-2xl">Socail media</h4>
                    <div className="flex  gap-4">
                        <Link href={'/policy'} className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineFacebook className="w-10 h-10"/>
                        </Link>
                        
                        <Link href={'/policy'} className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineTikTok   className="w-10 h-10"/>
                        </Link>
                        <Link href={'/policy'} className={'flex items-center text-gray-700 gap-3'}>
                            <AiOutlineTwitter  className="w-10 h-10"/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
