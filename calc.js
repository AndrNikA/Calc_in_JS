var calc=document.querySelector('.calc');
var out=document.querySelector('.calc_input');
var check=false;
var val="";

let calc_mouse=document.querySelector('.calc');
calc_mouse.addEventListener('mouseover',function(event){
	if (event.target.tagName=="BUTTON"){
		event.target.classList.add("hover_one");
	}
});

calc_mouse.addEventListener('mouseout',function(event){
	if (event.target.tagName=="BUTTON"){
		event.target.classList.remove("hover_one");
	}
});
calc.addEventListener("click",function(event){
	calc1();
	calc2();
});

function result(){
	val=out.value;
	if(val.includes("!")){
		fact();
		printinput();
	}
	else printinput();
}

function printinput(){
	try
	{
		out.value=eval(val);
		errorout();
	}
	catch
	{
		error();
	}
}


function calc1(){
	if (event.target.innerHTML==='C') out.value="";
	else if (event.target.innerHTML==='=') {
		result();
	}
	else if ( /^[0-9*+-/()]+$/.test(event.target.innerHTML)) {
	out.value+=event.target.innerHTML;
	}
	if (event.target.innerHTML==='=&gt;'){
		if (check){
			if( document.documentElement.scrollWidth>400){
				document.querySelector('.calc').style.width="300px";
				document.querySelector('.calc_input').style.width="75%";
			}
			document.querySelector('.calc_block2').style.display="none";
			check=false;
		}
		else{
			if( document.documentElement.scrollWidth>400){
				document.querySelector('.calc').style.width="525px";
				document.querySelector('.calc_input').style.width="77%";
			}
			document.querySelector('.calc_block2').style.display="block";
			check=true;
		}
	}
	
	if (event.target.innerHTML==="&lt;&lt;") out.value=out.value.slice(0,-1);
}

function calc2(){
	switch(event.target.innerHTML){
		case 'x^y':
			out.value+="**";
			break;
		case 'x!':
			out.value+="!";
			break;
		case 'ln':
			out.value+="Math.log(";
			break;
		case 'sin':
			out.value+="Math.sin(";
			break;
		case 'cos':
			out.value+="Math.cos(";
			break;
		case '√':
			out.value+="Math.sqrt(";
			break;
		case 'tan':
			out.value+="Math.tan(";
			break;
		case 'acos':
			out.value+="Math.acos(";
			break;
		case 'asin':
			out.value+="Math.asin(";
			break;
		case 'atan':
			out.value+="Math.atan(";
			break;
		case 'exp':
			out.value+="Math.exp(";
			break;
		case 'log10':
			out.value+="Math.log10(";
			break;
		case 'log2':
			out.value+="Math.log2(";
			break;
		case '||':
			out.value+="Math.abs(";
			break;
		case 'mod':
			out.value+="%";
			break;
	}
}

function fact(){
	let end=0;//Индексы поиска факториала
	let ind=0;
	let endsc=0;//Индексы поиска скобок
	let indsc=0;
	let sch=0;
	let flag=false;
	let textsc="";
	let textscresult=0;
	let fact1=0;
	let factt=1;
	factresult();
	do{
		for (let i=0;i<val.length;i++){
			if ((val[i]==="(") && ("+"==val[i-1] || "-"==val[i-1] || "*"==val[i-1] || "/"==val[i-1] || ""==val[i-1] || i==0))
			{
				for (let j=i;j<val.length;j++){
					if (val[j]==")"){
						endsc=j+1;
						indsc=i;
						break;
					}
				}	
			}
		}
		if(endsc!=0)
		{
			textsc=val.slice(indsc,endsc);
			textscresult=eval(textsc);
			val=val.replace(textsc,textscresult);
		}
		for (let i=0;i<val.length;i++){
			if ((val[i]==="(") && ("+"==val[i-1] || "-"==val[i-1] || "*"==val[i-1] || "/"==val[i-1] || ""==val[i-1]))
			{
				flag=true;
				break;
			}
			else{
				flag=false;
			}
		}
	}while(flag);
	factresult();
}

function factresult(){
	do{
		end=0;
		ind=0;
		fact1=0;
		factt=1;
		for (let i=0;i<val.length;i++){
			if (val[i]=="!" && val[i-1]!=")")
				end=i;
	
		}
		for (let i=end;0<i;i--){
			if ("("==val[i] || ")"==val[i] || "+"==val[i] || "-"==val[i] || "*"==val[i] || "/"==val[i] || " "==val[i] || ""==val[i] || undefined==val[i-1])
			{
				ind=i+1;
				break;
			}				
		}
		fact1=Number(val.slice(ind,end));
		for (let i=1;i<=fact1;i++){
			factt*=i;
		}
		val=val.replace(fact1+"!",factt);
		for (let i=0;i<val.length;i++){
			if (val[i]=="!" && val[i-1]!=")"){
				flag=true;
				break;
			}
			else flag=false;
		}
	}
	while (flag);
}

function error(){
	if(document.querySelector('.error')==null)
		calc.insertAdjacentHTML("beforeend",'<div class="error">Произошла ошибка! Проверьте правильность написания</div>');

}
function errorout(){
	if(document.querySelector('.error')!=null)
		document.querySelector('.error').remove();
}