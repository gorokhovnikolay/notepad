export const debounce = (fn:any,delay:number)=>{
	let timer:NodeJS.Timeout
	return (arg:any)=>{
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			fn(arg)
		},delay)
	}
}
