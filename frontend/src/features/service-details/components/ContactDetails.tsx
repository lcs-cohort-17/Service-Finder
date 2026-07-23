import React from "react";


interface ContactDetailsProps{

phone:string;
email?:string;
website?:string;

}



const ContactDetails:React.FC<ContactDetailsProps>=({

phone,
email,
website

})=>{


return (

<div className="space-y-2">


<h3 className="font-semibold text-gray-800">
Contact
</h3>


<p className="text-sm">
📞 {phone}
</p>


{
email &&
<p className="text-sm">
✉️ {email}
</p>
}


{
website &&
<a
href={website}
target="_blank"
className="
text-sm
text-teal-600
underline
"
>
🌐 Website
</a>
}


</div>

);

};


export default ContactDetails;