import React from "react";


interface AccessibilityInfoProps{

wheelchair:boolean;
parking:boolean;
assistance:boolean;

}


const AccessibilityInfo:React.FC<AccessibilityInfoProps>=({

wheelchair,
parking,
assistance

})=>{


const items=[

{
label:"Wheelchair Accessible",
value:wheelchair
},

{
label:"Accessible Parking",
value:parking
},

{
label:"Staff Assistance Available",
value:assistance
}

];


return (

<div className="space-y-2">

<h3 className="
font-semibold
text-gray-800
">
Accessibility
</h3>


{
items.map((item,index)=>(

<div
key={index}
className="
flex
justify-between
rounded-lg
bg-gray-50
p-3
text-sm
"
>

<span>
{item.label}
</span>


<span>

{
item.value
?
"✅"
:
"❌"
}

</span>


</div>


))

}

</div>

);

};


export default AccessibilityInfo;