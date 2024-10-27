
// -----------Initializing--------------------- / 

const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeEducation_uni = document.getElementById("resumeEducation_uni") as HTMLParagraphElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById("resumeWorkExperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
const backButton = document.getElementById("backButton") as HTMLButtonElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;
const shareLinkButton = document.getElementById("shareLinkButton") as HTMLButtonElement;




form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();




// ---------------collect/ store;saved----------------------

const name = (document.getElementById("name") as HTMLInputElement).value;
const email = (document.getElementById("email") as HTMLInputElement).value;
const phone = (document.getElementById("phone") as HTMLInputElement).value;
const university = (document.getElementById("university") as HTMLInputElement).value;
const university_degree = (document.getElementById("university_degree") as HTMLInputElement).value;
const degree = (document.getElementById("degree") as HTMLInputElement).value;
const education = (document.getElementById("education") as HTMLInputElement).value;
const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
const photoInput = document.getElementById("photo") as HTMLInputElement;

const photoFile = photoInput.files ? photoInput.files[0] : null;
let photoBase64 = '';

if (photoFile) {
    photoBase64 = await fileToBase64(photoFile);
    // Store the photo in localStorage instead of passing it in the URL
    localStorage.setItem("resumePhoto", photoBase64);
    resumePhoto.src = photoBase64;
}

// ---------------------Generate------------------------ /

document.querySelector(".container")?.classList.add("hidden");
    resumePage.classList.remove("hidden");



// ------------------------Providing Data-------------------------------
resumeName.textContent = name;
resumeEmail.textContent = `Email: ${email}`;
resumePhone.textContent = `Phone: ${phone}`;
resumeEducation_uni.textContent = `${university_degree} from ${university}`;
resumeEducation.textContent = `${degree} from ${education}`;
resumeWorkExperience.textContent = workExperience;
resumeSkills.textContent = skills;



// -----------------------------Shareable link-----------------------------
 // Generate shareable link without the photo
 const queryParams = new URLSearchParams({
    name: name,
    email: email,
    phone: phone,
    degree: degree,
    education: education,
    workExperience: workExperience,
    skills: skills,
});

const uniqueUrl = `${window.location.origin}?${queryParams.toString()}`;
shareLinkButton.addEventListener("click", () => {
    navigator.clipboard.writeText(uniqueUrl);
    alert('link copied!');
});

window.history.replaceState(null, '', `?${queryParams.toString()}`);
});






// -------------------------------------------
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);


    });
}


// --------------------------Edited Button-------------------------------
editButton.addEventListener("click", () => {
    // Populate the form with current resume data for editing
    updateFormFromResume();

    // Show the form again for editing
    document.querySelector(".container")?.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
// Edited Button function
function updateFormFromResume() {
    const [degree, education] = resumeEducation.textContent?.split("from") || '';
    (document.getElementById("name") as HTMLInputElement).value = resumeName.textContent || '';
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace('Email: ', '') || '';
    (document.getElementById("phone") as HTMLInputElement).value = resumePhone.textContent?.replace('Phone: ', '') || '';
    (document.getElementById("degree") as HTMLInputElement).value = degree || '';
    (document.getElementById("education") as HTMLInputElement).value = education || '';
    (document.getElementById("workExperience") as HTMLTextAreaElement).value = resumeWorkExperience.textContent || '';
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || '';
}


// -----------------------------Download Section:--------------------
declare const html2pdf : any;

downloadPdfButton.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error: html2pdf library is not loaded.');
        return;
    }

  

    const resumeOptions = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };



// --------------------------calling function------------------------
html2pdf().from(resumeContent).set(resumeOptions).save().catch((error: Error) => {
            console.error('PDF (error):', error);
        });




})




// ------query on page load------------------
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const university = params.get('university') || '';
    const university_degree = params.get('university_degree') || '';
    const degree = params.get('degree') || '';
    const education = params.get('education') || '';
    const workExperience = params.get('workExperience') || '';
    const skills = params.get('skills') || '';

    if (name || email || phone || university_degree ||university || degree || education || workExperience || skills) {
        //  resume preview 
        resumeName.textContent = name;
        resumeEmail.textContent = `Email: ${email}`;
        resumePhone.textContent = `Phone: ${phone}`;
        resumeEducation_uni.textContent = `${university_degree} from ${university}`;
        resumeEducation.textContent = `${degree} from ${education}`;
        resumeWorkExperience.textContent = workExperience;
        resumeSkills.textContent = skills;

        //  photo from localStorage se lay k ana
        const savedPhoto = localStorage.getItem("resumePhoto");
        if (savedPhoto) {
            resumePhoto.src = savedPhoto;
        }

        // show resume page
        document.querySelector(".container")?.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});

// CSS for  image is styled properly
resumePhoto.style.width = "150px";  
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%"; 
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";
