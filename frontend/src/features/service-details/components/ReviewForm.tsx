import React, {useState} from "react";


interface ReviewFormProps{
onSubmit:(review:{
rating:number;
comment:string;
})=>void;
}


const ReviewForm:React.FC<ReviewFormProps> = ({
onSubmit
})=>{


const [rating,setRating]=useState(5);
const [comment,setComment]=useState("");



const submit=()=>{

onSubmit({
rating,
comment
});

setComment("");

};



return (

<div className="
space-y-3
rounded-xl
bg-gray-50
p-4
">


<h3 className="font-semibold">
Leave a review
</h3>


<select
value={rating}
onChange={(e)=>setRating(Number(e.target.value))}
className="
w-full
rounded-lg
border
p-2
"
>

<option value="5">
★★★★★
</option>

<option value="4">
★★★★
</option>

<option value="3">
★★★
</option>

<option value="2">
★★
</option>

<option value="1">
★
</option>

</select>


<textarea

value={comment}

onChange={(e)=>setComment(e.target.value)}

placeholder="Share your experience..."

className="
h-24
w-full
rounded-lg
border
p-3
"

/>


<button

onClick={submit}

className="
rounded-lg
bg-teal-600
px-4
py-2
text-white
hover:bg-teal-700
"

>

Submit Review

</button>


</div>

);

};


export default ReviewForm;