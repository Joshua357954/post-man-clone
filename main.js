const addTabs = document.querySelector('.title')
const connectionStatus = document.querySelector('.status')
const apiVerb = document.querySelector('.select')
const sendBtn = document.querySelector('.send-btn')
const apiUrl = document.querySelector('.apiUrl')
const paramsContainer = document.querySelector('.params')
const addParams = document.querySelector('.span-one')
const displayResult = document.querySelector('.show-result')
const taba = document.querySelector('[data-name=tab1]')

console.log(taba)
taba.addEventListener('keyup',({target})=>{
	console.log(target.value)

	const doc =document.querySelector('title')
	console.log(doc)
	doc.textContent = target.value
})


let currentParamId= 0

function addListenersToInput(){
	const paramsInput = paramsContainer.querySelectorAll('[name]')
	paramsInput.forEach(element => {
		element.addEventListener('focus',(e)=>{
			currentParamId = element.dataset.id
		})

		element.addEventListener('keyup',(e)=>{
			updateApiParams(e)
		})

	})
}


addListenersToInput()



// Add Params Entry key - value
const apiParams = [
		{
			key:"",value:""
		}
]


function updateApiParams({target}){
	const val = target.value
	if (target.name=='key')
		return apiParams[currentParamId].key = val 

	apiParams[currentParamId].value = val
}

function compressApiParams(){
	const staging= {}
	apiParams.map(item => {
		if(item.key=='') return 
		// staging.push({})
		const slen = staging.length-1 
		staging[item.key]=item.value
	})
	return staging

}


// console.log(paramsInput)


addParams.addEventListener('click',()=> hello())

function hello (){
	const len = apiParams.length

	apiParams.push({ key:"", value:"" })

	console.log('Am clicking ..')
	//  ---------------------
	const PItem = document.createElement('div')
	PItem.setAttribute("data-id",len.toString())
	PItem.classList.add('key-value')

	const input1 = document.createElement('input')
	input1.setAttribute('name','key')
	input1.setAttribute("data-id",len.toString())
	input1.setAttribute('placeholder','key')

	const input2 = document.createElement('input')
	input2.setAttribute('name','value')
	input2.setAttribute("data-id",len.toString())
	input2.setAttribute('placeholder','value')

	PItem.appendChild(input1)
	PItem.appendChild(input2)
	//  -----------------------

	paramsContainer.appendChild(PItem) 
	addListenersToInput()
	console.log(apiParams)
	console.log("compressed",compressApiParams())
	

}

// Send Button to trigger the api call
sendBtn.addEventListener('click',(e)=>{

	const online= 'https://' , offline = 'http://'
	const internet =connectionStatus.checked
	const reqType = apiVerb.value
	let url = apiUrl.value

	if (!url.startsWith(online) || url.startsWith(offline))
		url = internet ? `${online}${url}` : `${offline}${url}`
	console.log(url)

	makeRequest(reqType,url) 

})

const httpVerb = ['get','post','put','delete']

// localhost:5001/api/chat/findMany/6c0682d1-4f2e-4fb4-a71e-05495ca554c0
// 6c0682d1-4f2e-4fb4-a71e-05495ca554c0 (userid = pablo)

const makeRequest = async(type,url) => {
	displayResult.innerText=""
	const reqData = compressApiParams()

	switch(type){

		case httpVerb[0]:
			return getRequest(url)

		case httpVerb[1]:
			return postRequest(url,reqData)

		case httpVerb[2]:
			return console.log('put')

		case httpVerb[3]:
			return console.log('delete ')

		default :
			return console.log('default')
	}
	
}	


function getRequest(url){
	fetch(url)
		.then(res => res.json())
		.then(data => {
			const paresdResult = JSON.stringify(data,null,2)
			displayResult.innerText=paresdResult
		})
}

function postRequest(url,data){
	console.log("Log from postReq : ", JSON.stringify(data))
	const defaults = {
		method:'POST',
		body: JSON.stringify(data),
		headers:{
			'Content-Type':'application/json'
		}
	}



	fetch(url, defaults )
		.then(res => res.json())
		.then(data => {
			displayResult.innerHTML = JSON.stringify(data,null,2)
			console.log(data,'PostRequest successful')
	}).catch((error)=>{
		console.log(error)
	})
}





// tabs.forEach((dtab) => {
// 	dtab.addEventListener('click',(e)=>{
// 		// console.log(e)
// 		changeTab(e.target.innerText)
// 	})

// })


// const changeTab = (tab=1) => {
// 	console.log(tab);
// }