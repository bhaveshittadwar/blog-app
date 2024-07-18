import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { signupType } from "@bhavesh.ittadwar/common";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const [postInputs, setPostInputs] = useState<signupType>({
        name: "",
        email: "",
        password: "",
    })
    return <div className="h-screen flex flex-col justify-center items-center">
        <div className="justify-center">
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                    Create an Account
                </div>
                <div className="text-slate-500 text-center">Already have an account? <Link className="pl-1 underline" to={"/signin"}>Login</Link></div>
            </div>
            <div className="pt-4">
                <LabelledInput label="Name" placeholder="Bhavesh Ittadwar..." onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPostInputs(c => ({
                        ...c,
                        name: e.target.value
                    }))
                }} />
                <LabelledInput type="email" label="Email" placeholder="abc@xyz.com" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPostInputs(c => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />
                <LabelledInput type="password" label="Password" placeholder="Password" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({label, placeholder, onChange, type}: LabelledInputType) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm text-gray-900 font-semibold">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}