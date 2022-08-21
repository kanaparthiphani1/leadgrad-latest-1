
var fname, lname, email, mobile, destination, city, state, pincode;

function readFom() {
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    email = document.getElementById("email").value;
    mobile = document.getElementById("mobile").value;
    destination = document.getElementById("destination").value;
    city = document.getElementById("city").value;
    state = document.getElementById("state").value;
    pincode = document.getElementById("pincode").value;
    //console.log(rollV, nameV, addressV, genderV);
}

function insert() {
    readFom();

    firebase
        .database()
        .ref("client/" + email.split('@')[0] + '|' + mobile)
        .set({
            first_name: fname,
            last_name: lname,
            email: email,
            mobile: mobile,
            destination: destination,
            city: city,
            state: state,
            pincode: pincode
        });
    alert("Data Inserted");
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("pincode").value = "";


};



function readReviews() {
    console.log("reading");
    firebase
        .database()
        .ref("clientReviews")
        .on("value", function (snap) {
            console.log(snap.val());
            const obj = snap.val()
            const reviewer = [];
            let keys = Object.keys(obj);
            while (reviewer.length< 5) {

                const rand = keys[Math.floor(Math.random() * keys.length)]

                console.log("Rand :", rand);


                if ((!reviewer.includes(rand)) && obj[rand].rating >= 4 && obj[rand].approved === true) {
                    reviewer.push(rand);

                }

                console.log("Reviwer : ",reviewer);
                keys = keys.filter(x => x !== rand)
            
            }

            console.log(reviewer);
            for (let x = 1; x <= 5; x++) {

                console.log(`review-para-${x}`);
                console.log(obj[reviewer[x - 1]].comments);
                console.log(obj[reviewer[x - 1]].name);
                console.log(obj[reviewer[x - 1]].rating);
                console.log("--------------------");
                document.getElementById(`para-${x}`).innerHTML = obj[reviewer[x - 1]].comments;
                document.getElementById(`name-${x}`).innerHTML = obj[reviewer[x - 1]].name;
                document.getElementById(`rating-${x}`).innerHTML = obj[reviewer[x - 1]].rating;
                document.getElementById(`pic-${x}`).src = obj[reviewer[x - 1]].gender==='Male'?"assets/img/man.png":"assets/img/female.png"

            }

            // clientReviewOuter.appendChild(clientReviewCont)
        });








};


// document.getElementById("update").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .update({
//       //   rollNo: rollV,
//       name: nameV,
//       gender: genderV,
//       address: addressV,
//     });
//   alert("Data Update");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };
// document.getElementById("delete").onclick = function () {
//   readFom();

//   firebase
//     .database()
//     .ref("student/" + rollV)
//     .remove();
//   alert("Data Deleted");
//   document.getElementById("roll").value = "";
//   document.getElementById("name").value = "";
//   document.getElementById("gender").value = "";
//   document.getElementById("address").value = "";
// };

readReviews();