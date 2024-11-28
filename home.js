import{auth,onAuthStateChanged, signOut, db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  limit,
  doc, deleteDoc} from "./firebase.js"




  onAuthStateChanged(auth , (user)=> {
    console.log(user);
    
  if (user) {
    const profilePicture = document.querySelector(".profile-pict");
    const displayName = document.querySelector(".dp-name-p");
    displayName.innerHTML = user.displayName || "Anonymous"; 
    profilePicture.src = user.photoURL || "default-pic.jpg";
  } else {   
    // window.location.href = " https://aura-posting-web.web.app";
    console.log(error);
    
  }
});






const logoutBtn = document.getElementById('logoutBtn');

let out = ()=>{

 signOut(auth).then(() => {
   alert('Sign-out successfuly!.')
   window.location.href = 'index.html'
 }).catch((error) => {
   alert('error',error)
 });
}
logoutBtn.addEventListener('click',out)
///cloudnary///

let uploadPreset = 'z3bvbdnr'
let cloudName = 'dgtkpucrf'

const postForm = document.getElementById("postForm");
const postsGrid = document.getElementById("postsGrid");

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const caption = document.getElementById("caption").value.trim();
    const pictureURL = document.getElementById("pictureURL").value.trim();
    const fileInput = document.getElementById("fileInput").files[0]; // Get the selected file

    let imageURL = pictureURL; // Default to the URL provided

    // If a file is selected, upload it to Cloudinary
    if (fileInput) {
        const formData = new FormData();
        formData.append("file", fileInput);
        formData.append("upload_preset", uploadPreset); // Replace with your upload preset
        formData.append("folder", "postApp"); // Optional: Specify a folder name in Cloudinary

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.secure_url) {
                imageURL = data.secure_url; // Get the URL of the uploaded image
                createPost(caption, imageURL); // Create post after the file is uploaded
            } else {
                Swal.fire("Error", "There was an error uploading the image.", "error");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            Swal.fire("Error", "There was an error uploading the image.", "error");
        }
    } else if (pictureURL) {
        createPost(caption, imageURL); // Create post directly if URL is provided
    } else {
        Swal.fire("Warning", "Please fill out all fields!", "warning");
    }
});



async function createPost(caption, imageURL) {
    try {
        // Save post to Firestore
        await addDoc(collection(db, "posts"), {
            caption: caption,
            imageUrl: imageURL,
            createdAt: new Date()
        });

        const postHTML = `
            <div class="post">
                <p>${caption}</p>
                <img src="${imageURL}" alt="${caption}" />
            </div>
        `;
        postsGrid.innerHTML += postHTML;
        document.getElementById("noPostsMessage").style.display = "none";
        postForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        Swal.fire("Error", "There was an error saving the post.", "error");
    }



}

