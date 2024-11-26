// https://api.github.com/users/

const months = ['kuch_nahi', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const input_container = document.querySelector("[input-container]");
const search_btn = document.querySelector("[search-btn]");
const profile_image = document.querySelector("[profile-image]");
const user_name = document.querySelector("[name]");
const user_date = document.querySelector("[date]");
const userId = document.querySelector("[user_id]");
const user_bio = document.querySelector("[bio]");
const user_repos = document.querySelector("[repos]");
const user_followers = document.querySelector("[followers]");
const user_following = document.querySelector("[following]");
const user_location = document.querySelector("[location]");
const user_blog = document.querySelector("[bio_link]");
const user_twitter = document.querySelector("[twitter]");
const user_company = document.querySelector("[company]");
const error_message = document.querySelector(".error-message");
// dark mode krne ke liye
const wrappper = document.querySelector(".wrapper");
const DEV = document.querySelector(".top-heading");
const top_btn = document.querySelector(".top-btn");
const search_bar = document.querySelector(".search-bar");
const user_section = document.querySelector(".user-section");



function render_user_details(user_data)
{
    const profile_image = document.querySelector("[profile-image]");
    const user_namee = document.querySelector(".nameeee");
    const user_date = document.querySelector(".date");
    const userId = document.querySelector("[user_id]");
    const user_bio = document.querySelector("[bio]");
    const user_repos = document.querySelector("[repos]");
    const user_followers = document.querySelector("[followers]");
    const user_following = document.querySelector("[following]");
    const user_location = document.querySelector("[location]");
    const user_blog = document.querySelector("[bio_link]");
    const user_twitter = document.querySelector("[twitter]");
    const user_company = document.querySelector("[company]");

    profile_image.src = `${user_data?.avatar_url}`;
    user_namee.innerText = user_data?.name;
    
    let stri_date = user_data?.created_at;
    let date_str = stri_date.split("T");
    let main_date = date_str[0].split("-");
    let month = main_date[1];
    let exact_month = Number(month[1]);
    let user_text = `Joined ${main_date[2]} ${months[exact_month]} ${main_date[0]}`;
    user_date.innerText = user_text;
    userId.innerText = `@${user_data?.login}`;
    userId.href = user_data?.login;
    if(user_data.bio === null)
    {
        user_bio.innerText = "This profile has no bio";
    }
    else {
        user_bio.innerText = user_data?.bio;
    }
    user_repos.innerText = user_data?.public_repos;
    user_followers.innerText = user_data?.followers;
    user_following.innerText = user_data?.following;
    if(user_data.location === null)
    {
        user_location.innerText = "Not Available"
    }
    else {
        user_location.innerText = user_data?.location;
    }
    if(user_data.blog === null)
    {
        user_blog.innerText = "Not Available"
    }
    else {
        user_blog.innerText = user_data?.blog;
    }
    user_blog.href = user_data?.gists_url;
    if(user_data.company === null)
    {
        user_company.innerText = "Not Available"
    }
    else {
        user_company.innerText = user_data?.company;
    }
    if(user_data.twitter_username === null)
    {
        user_twitter.innerText = "Not Available";
    }
    else {
        user_twitter.innerText = user_data?.twitter_username;
    }
    user_twitter.href = `https://twitter.com/${user_data?.twitter_username}`;
}


async function find_user(user_naam)
{
    const response = await fetch(`https://api.github.com/users/${user_naam}`);
    const data = await response.json();
    if(data.message === "Not Found")
    {
        error_message.classList.add("active");
    }
    else {
        error_message.classList.remove("active");
        render_user_details(data);
    }
}

function get_user_details()
{
    let username = input_container.value;
    if(username === "")
    {
        username = "thepranaygupta"
        find_user(username);
    }
    else {
        find_user(username);
    }
}

search_btn.addEventListener("click" , get_user_details);

if(input_container.value === "")
{
    let username = "thepranaygupta"
        find_user(username);
}


// const wrappper = document.querySelector(".wrapper");
// const DEV = document.querySelector(".top-heading");
// const top_btn = document.querySelector(".top-btn");
// const search_bar = document.querySelector(".search-bar");
// const user_section = document.querySelector(".user-section");

function darkMode()
{
    wrappper.classList.add("dark");
    DEV.classList.add("dark");
    top_btn.classList.add("dark");
    search_bar.classList.add("dark");
    user_section.classList.add("dark");
}

function lightMode()
{
    wrappper.classList.remove("dark");
    DEV.classList.remove("dark");
    top_btn.classList.remove("dark");
    search_bar.classList.remove("dark");
    user_section.classList.remove("dark");
}

top_btn.addEventListener("click" , ()=>{
    if(top_btn.classList.contains("dark"))
    {
        lightMode();
    }
    else{
        darkMode();
    }
});