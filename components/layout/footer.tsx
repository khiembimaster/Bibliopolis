import { PiPhone } from "react-icons/pi";
import Link from "next/link"
import { IoMailOutline } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="bg-[#f9f9f9] pt-14 pb-32 bg-left-bottom bg-repeat-x" style={{backgroundImage: `url('/image/footer.png')`}}>
            <div className={' relative z-10 container grid lg:grid-cols-4 gap-8 '}>
                <div className="flex flex-col gap-6 lg:col-span-2">
                    <h4 className="font-bold text-2xl">Contact</h4>
                    <div className="flex flex-col gap-4">
                        <Link href={'#youtobe'} className={'flex items-center text-gray-700 gap-3'}>
                            <PiPhone className="x-6 h-6"/>
                            <span>0708033506</span>
                        </Link>
                        <Link href={'#mail'} className={'flex items-center text-gray-700 gap-3'}>
                            <IoMailOutline className="x-6 h-6"/>
                            <span>nguyenpv.30@gmail.com</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
