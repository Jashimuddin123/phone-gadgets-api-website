const loadPhone =async (searchPhone = '12', issShowAll) =>{
 const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
 const data = await res.json();
  const phones = data.data;
 
  displayLoadPhone(phones, issShowAll)
}


const displayLoadPhone = (phones, issShowAll) =>{
    // setp 1: get id

     const cardContainer = document.getElementById('phone-container')

    //  clear search filed
     cardContainer.textContent =  '';
    //   -------
    const displayPhone = document.getElementById('display-phone');
    if(phones.length > 12 && !issShowAll){
        displayPhone.classList.remove('hidden')
    }
    else{
        displayPhone.classList.add('hidden')
    }
    //  show only 12 phone  after showall 
    if(!issShowAll){
       phones = phones.slice(0, 12);
    }
        
     phones.forEach(phone =>{
    
    
        //  step 2: create a div
        const createDiv = document.createElement('div');
         createDiv.classList = `card w-96 bg-base-100 shadow-xl`
        // step 3: set innert html
        createDiv.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button onclick = "handleShowDetails('${phone.slug}') " class="btn btn-primary">Show Details</button>
        </div>
      </div
         
        `;
    // step 4: appeand child  
    cardContainer.appendChild(createDiv)
     })
     loadingSpiner(false)
    }
    // handle show details btn

    const handleShowDetails = async (id) => {
      const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
      const data = await res.json();
      const phone = data.data;
      showDetailsModal(phone)
   
    }
    // show details modal 
    const showDetailsModal = (phone) =>{
      console.log(phone);
      // show modal call 
      show_details_modal.showModal()
    // set show details btn phone name
    const phoneName = document.getElementById('show-phone-name');
    phoneName.innerText = phone.name
     
     
      // create div
      const showDetailsPhoneContainer = document.getElementById('showDetails-phone-container');
  
     showDetailsPhoneContainer.innerHTML = `
      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
       <h1 class = "text-center font-semibold"> Brand : ${phone.brand} </h1>
       <h1>Storage: ${phone.mainFeatures.storage}</h1>
       <h1>DisplaySize: ${phone.mainFeatures.displaySize}</h1>
       <p>chipSet : ${phone.mainFeatures.chipSet}</p>
       <p>Memory : ${phone.mainFeatures.memory}</p>
       <p>Slug: ${phone.others.slug}</p>
       <p> ReleaseDate: ${phone.others.releaseDate}</p>
       <p>GPS: ${phone.others.GPS}</p>

      `   
      
    }


    // search dandle

     const searchHandle = (issShowAll) =>{
      loadingSpiner(true)
        const inputFild =  document.getElementById('input-field');
        const textField = inputFild.value;
        loadPhone (textField, issShowAll);

     }


    //  Lodding Toggle Spiner

    const loadingSpiner = (issLoading) =>{
      // get the spiner id 
      const loadingSpiner = document.getElementById('loading-spiner');
      if(issLoading){
        loadingSpiner.classList.remove('hidden')
      }

      else{
        loadingSpiner.classList.add('hidden')
      }

    }

    //  handle showall Button
    const handleShowAll = ( issShowAll) =>{
      searchHandle (true)
   }



loadPhone ();