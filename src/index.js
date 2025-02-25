import Model from './model.js';

window.onload = function () {
const createPostContent = `<div id="newPost">
        <p class="CreateHeader" id="newPostSign">Create Post</p>
        
          <select name="Which Community" class="newPostSelect" id="newPostCommunity" required>
            <option value="" selected>Please Select a Community</option>
            <option value="Com1" class="newPostOption">Com1</option>
            <option value="Com2" class="newPostOption">Com2</option>
            <option value="Com3" class="newPostOption">Com3</option>
          </select>
      
          <p class="newPostInstruct">Title: </p>
          <input placeholder="Title of the Post" id="newPostTitle" class="newPostInput" type="text" required minlength="1" maxlength="100"></input>
          
          <p class="newPostInstruct" id="newPostflairSelect">Flair(optional): </p>
          <select name="Select a Flair" class="newPostSelect">
            <option value="" selected>Please select</option>
            <option value="F1" class="newPostFlairOption">F1</option>
            <option value="F2" class="newPostFlairOption">F2</option>
            <option value="F2" class="newPostFlairOption">F3</option>
          </select>
          <p>
              <input placeholder="Enter a Flair" id="newPostFlairEnter" class="newPostInput" type="text" maxlength="30"></input>
          </p>
          <p class="newPostInstruct">Body: </p>
          <p>
              <textarea placeholder="Start Writing..." id="newPostContent" class="newPostInput" type="text" required minlength="1"></textarea>
          </p>
          <p class="newPostInstruct">Username: </p>
          <p>
              <input placeholder="Enter Username" id="newPostUsername" class="newPostInput" type="text" required minlength="1"></input>
      
          </p>
            <button type="submit" id="newPostSubmit">Submit Post</button>
            <a id="cancelNewPost" href="./index.html">Cancle</a>
            
      
      </div>`;


const createCommunityContent = `<div id="newCommunity">
            <form>
                <div class="CreateHeader">Create a New Community</div>
                <div class="CreatePostField">Community name (required, max 100 characters)</div>
                <input placeholder="Name of Community" id="communityName" class="CreatePostInput" type="text" required minlength="1" maxlength="100"></input>
                <div class="CreatePostField" >Community Description (required, max 500 characters)</div>
                <textarea placeholder="Describe your community" id="CommuDescriptionInput" class="CreatePostInput" type="text" required minlength="1" maxlength="500"></textarea>
                <div class="CreatePostField">Creater Username (required max ?? chars??)</div>
                <input placeholder="Username" id="communitysCreater" class="CreatePostInput" type="text" required minlength="1" maxlength="100"></input>
            </form>
            <button id="newCommunitySubmit">Engender Community</button>
        </div>`;

const createCommentContent = `<div id="newComment">
        <p class="CreateHeader" id="newPostSign">Add a Comment</p>
          
        <form>
            <p class="newCommentInstruct">Comment: (required, max 500 characters)</p>
            <input placeholder="" id="" class="newCommentInput" type="text" required minlength="1" maxlength="500"></input>
            <p class="newCommentInstruct">Username: </p>
            <input placeholder="" id="" class="newCommentInput" type="text" required minlength="1" maxlength="100"></input>        
        </form>
        <button type="submit" id="newCommentSubmit">Post Comment</button>
        <a id="cancelComment" href="">Cancle</a>
      </div>`;

const communityPageView = `<div class="midboxHeader">
            <div class="leftsideHeader">
                <h2 id="headerLF">Community name</h2>
                <div id="communityDescription">communityDescription</div>
                <div id="communityCreatedTime">Created time</div>
                <div id="communityMemberCount">Members</div>
            </div>
            <div class="rightsideHeader">
                <div>
                    <button href="#" id="newestSort">Newest</button>
                    <button href="#" id="oldestSort">Oldest</button>
                    <button href="#"id="activeSort">Active</button>
                </div>
            </div>
        </div>
      <hr>
      <h3 id="postsTotal"></h3>
        <section class="postContainer">
            <div id="postTemplate" class="posts postOne">
                <ul>
                    <li id="communityName"></li>
                    <li id="posterName"></li>
                    <li id="postAge"></li>
                </ul>
                <h2 href="#" class="postOne"></h2>
                    <p class="postOne"></p>
                <p class="postOne"></p>
                <div class="postsFooter">
                    <p class="postOne"></p>
                    <p class="postOne"></p>
                </div>
                <hr>
            </div>
        </section>`;


  // fill me with relevant code


  //populates communities left side
  const modelObj = new Model;

  //            Methods used to populate index.html main page

  const communitesList = document.getElementById("communitiesList");
  const communitiesArray = modelObj.data.communities;
  const postsArray = modelObj.data.posts;
  const commentsArray = modelObj.data.comments;

  const linkFlairArray = modelObj.data.linkFlairs;
  document.getElementById("postsTotal").textContent = postsArray.length + " Posts"

  communitiesArray.forEach(function (current) {
    const newItem = document.createElement('li');
    newItem.textContent = current.name;
    communitesList.appendChild(newItem).classList.add("communitesElement");
  });

  function createPost(postData) {
    const template = document.getElementById("postTemplate");


    const postClone = template.cloneNode(true);


    postClone.querySelector("#communityName").textContent = findCommunity(postData.postID) + " | ";
    postClone.querySelector("#posterName").textContent = postData.postedBy + " | ";
    postClone.querySelector("#postAge").textContent = formatTimeStamp(postData.postedDate);
    postClone.querySelector("h2").textContent = postData.title;
    postClone.querySelectorAll("p")[0].textContent = findLinkFlair(postData.linkFlair);
    postClone.querySelectorAll("p")[1].textContent = postData.content.substring(0, 20) + "...";
    postClone.querySelector(".postsFooter p:nth-child(1)").textContent = "Views: " + postData.views;
    postClone.querySelector(".postsFooter p:nth-child(2)").textContent = "Comments: " + postData.commentIDs.length;
    postClone.removeAttribute('id');
    postClone.style.display = "block"
    postClone.classList.add("visiblePost");
    // Append the new post to the posts container

    document.querySelector(".postContainer").appendChild(postClone);

  }

  function createPost(postData) {
    const template = document.getElementById("postTemplate");


    const postClone = template.cloneNode(true);


    postClone.querySelector("#communityName").textContent = findCommunity(postData.postID) + " | ";
    postClone.querySelector("#posterName").textContent = postData.postedBy + " | ";
    postClone.querySelector("#postAge").textContent = formatTimeStamp(postData.postedDate);
    postClone.querySelector("h2").textContent = postData.title;
    postClone.querySelectorAll("p")[0].textContent = findLinkFlair(postData.linkFlair);
    postClone.querySelectorAll("p")[1].textContent = postData.content.substring(0, 20) + "...";
    postClone.querySelector(".postsFooter p:nth-child(1)").textContent = "Views: " + postData.views;
    postClone.querySelector(".postsFooter p:nth-child(2)").textContent = "Comments: " + postData.commentIDs.length;
    postClone.removeAttribute('id');
    postClone.style.display = "block"
    postClone.classList.add("visiblePost");
    // Append the new post to the posts container

    document.querySelector(".postContainer").appendChild(postClone);

  }

  postsArray.forEach(postData => { createPost(postData); });

  //create a post view without the community name
  function createPostInCommunity(postData) {
    const template = document.getElementById("postTemplate");


    const postClone = template.cloneNode(true);


    //postClone.querySelector("#communityName").textContent = findCommunity(postData.postID) + " | ";
    postClone.querySelector("#posterName").textContent = postData.postedBy + " | ";
    postClone.querySelector("#postAge").textContent = formatTimeStamp(postData.postedDate);
    postClone.querySelector("h2").textContent = postData.title;
    postClone.querySelectorAll("p")[0].textContent = findLinkFlair(postData.linkFlair);
    postClone.querySelectorAll("p")[1].textContent = postData.content.substring(0, 20) + "...";
    postClone.querySelector(".postsFooter p:nth-child(1)").textContent = "Views: " + postData.views;
    postClone.querySelector(".postsFooter p:nth-child(2)").textContent = "Comments: " + postData.commentIDs.length;
    postClone.removeAttribute('id');
    postClone.style.display = "block"
    postClone.classList.add("visiblePost");
    // Append the new post to the posts container

    document.querySelector(".postContainer").appendChild(postClone);

  }

  //DO NOT TOUCH, REMOVES POSTTEMPLATE FROM DOM
  newestButtonFunction();

  //adding fontionality to the buttons New, Old, Active to sort posts
  document.getElementById("postTemplate").style.display = "none";
  document.getElementById("newestSort").addEventListener('click', newestButtonFunction);
  document.getElementById("oldestSort").addEventListener('click', oldestButtonFunction);
  document.getElementById("activeSort").addEventListener('click', newestButtonFunction);


  function newestButtonFunction() {
    const postArrayNew = Array.from(document.querySelectorAll(".visiblePost"));
    postArrayNew.sort((a, b) => {
      const dateA = a.querySelector("#postAge").textContent.charAt(0);
      const dateB = b.querySelector("#postAge").textContent.charAt(0);
      return dateA - dateB;
    });
    const postContainer = document.querySelector(".postContainer");
    postArrayNew.forEach(post => {
      postContainer.appendChild(post);
    })
  }

  function oldestButtonFunction() {
    const postArrayNew = Array.from(document.querySelectorAll(".visiblePost"));
    postArrayNew.sort((a, b) => {
      const dateA = a.querySelector("#postAge").textContent.charAt(0);
      const dateB = b.querySelector("#postAge").textContent.charAt(0);
      return dateB - dateA;
    });
    console.log(postArrayNew);
    const postContainer = document.querySelector(".postContainer");
    postArrayNew.forEach(post => {
      postContainer.appendChild(post);
    })
    console.log("clicked")
  }

  //function to create timestamps
  function formatTimeStamp(timestamp) {
    const today = new Date();
    const postDate = timestamp;

    const seconds = Math.floor((today - postDate) / 1000);  // Difference in seconds
    const minutes = Math.floor(seconds / 60);  // Convert seconds to minutes
    const hours = Math.floor(minutes / 60);  // Convert minutes to hours
    const days = Math.floor(hours / 24);  // Convert hours to days
    const months = today.getMonth() - postDate.getMonth() + (12 * (today.getFullYear() - postDate.getFullYear()));  // Calculate months difference
    const years = today.getFullYear() - postDate.getFullYear();  // Calculate years difference

    if (days === 0) {
      if (hours === 0) {
        if (minutes === 0) {
          return `${seconds} second(s) ago`;
        }
        return `${minutes} minute(s) ago`;
      }
      return `${hours} hour(s) ago`;
    }

    if (days < 30) {
      return `${days} day(s) ago`;
    }

    if (months < 12) {
      return `${months} month(s) ago`;
    }

    return `${years} year(s) ago`;
  }

  function findCommunity(postID) {
    const community = communitiesArray.find(community => community.postIDs.includes(postID));
    return community ? community.name : null;
  }

  function findLinkFlair(postLinkFlairID) {
    const linkFlair = linkFlairArray.find(linkFlair => linkFlair.linkFlairID.includes(postLinkFlairID));
    return linkFlair ? linkFlairID : null;
  }





  //            Methods used to create the community page

  // function to add community description to community page
  function addDescription(name) {

    const communityDescrip = document.createElement('p')
    const communityTimeStamp = document.createElement('p')
    const communityPostTotal = document.createElement('p')

    //grabs infomration from model.js and populates the page
    communitiesArray.forEach(element => {
      if (element.name == name) {
        communityDescrip.textContent = element.description;
        communityTimeStamp.textContent = "Created " + formatTimeStamp(element.startDate);
        communityPostTotal.textContent = element.postIDs.length;
        const leftsideHeader = document.querySelector(".leftsideHeader");
        const htmlPostTotals = document.getElementById("postsTotal")


        const existingParagraphs = leftsideHeader.querySelectorAll('p');
        existingParagraphs.forEach(paragraph => paragraph.remove());

        leftsideHeader.appendChild(communityDescrip)
        leftsideHeader.appendChild(communityTimeStamp)

        htmlPostTotals.innerHTML = communityPostTotal.textContent + " Posts"

      }
    })
  }

  //function to create generate only the community specific posts
  function addcommunityPosts(name) {
    const communityPostID = [];
    const template = document.getElementById("postTemplate");
    const postClone = template.cloneNode(true);
    console.log(postClone)

    document.querySelector(".postContainer").innerHTML = ''
    communitiesArray.forEach(element => {
      if (element.name == name) {
        communityPostID.push(...element.postIDs);
      }
    })
    document.querySelector(".postContainer").appendChild(postClone)
    communityPostID.forEach(id => {
      postsArray.forEach(posts => {
        if (posts.postID == id) {
          createPostInCommunity(posts); //we do not show community name in the community page
        }
      })
    })

  }


  //creates click event on the comunities name. when clicked takes you to community page
  const commItems = document.querySelectorAll(".communitesElement");
  commItems.forEach(item => {
    item.addEventListener('click', function (event) {
      var communityName = event.target.innerHTML;
      document.getElementById("headerLF").innerHTML = communityName;
      addDescription(communityName);
      addcommunityPosts(communityName);
    })
  })



  //

  // window.M = new Model(); // CMK added this for testing, feel free to remove/replace
  // console.log(M); // CMK added this for testing, feel free to remove/replace

  //creeate post button
  document.getElementById("createPost").addEventListener('click', function (event) {
    document.getElementById("midbox").innerHTML = createPostContent
  })

  //create community button
  document.getElementById("newCommunityButton").addEventListener('click', function (event) {
    document.getElementById("midbox").innerHTML = createCommunityContent
  })





  function displayThisCommunity(communityID) {
    const community = getCommunityData(communityID);
    const CommunityPostIDs = community.postIDs;



    if (!community) {
      console.log("cannot find the community");
      return;
    }

    //community information 
    document.getElementById("headerLF").innerHTML = community.name;
    document.getElementById("communityDescription").innerHTML = community.description;
    document.getElementById("communityCreatedTime").innerHTML = "Created " + formatTimeStamp(community.startDate);
    document.getElementById("communityMemberCount").innerHTML = community.members.length + " member(s)";
    document.getElementById("postsTotal").innerHTML = CommunityPostIDs.length + " post(s)";

    //posts
    const communityPosts = [];
    postsArray.forEach(post => {
      if (CommunityPostIDs.includes(post.postID)) {
        communityPosts.push(post);
      }
    });

    console.log(communityPosts);
    console.log(postsArray);
    console.log(CommunityPostIDs);
    communityPosts.forEach(postData => { createPostInCommunity(postData); });
  }

  // //go to community
  // document.getElementById("testing").addEventListener('click', function (event) {
  //   document.getElementById("midbox").innerHTML = communityPageView
  //   displayThisCommunity('community1');
  // })


  function getCommunityData(communityID) {
    const modelObj = new Model;
    return modelObj.data.communities.find(community => community.communityID === communityID);

  }
  // ---------------------------------- section for the search function  ----------------------------------

  document.getElementById("search").addEventListener('click', getSearchResults);

  function getSearchResults() {
    var searchBarText = document.getElementById("searchbar").value;
    console.log(searchBarText);
    const searchBarArray = searchBarText.split(" ");
    document.getElementById("searchbar").value = '';
    let results = new Set();


    commentsArray.forEach(comment => {
      searchBarArray.forEach(word => {
        if (comment.content.includes(word)) {
          postsArray.forEach(post => {
            if (post.commentIDs.includes(comment.commentID)) {
              results.add(post);
            }
          })
        }
      })
    })

    postsArray.forEach(post => {
      searchBarArray.forEach(word => {
        if (post.content.includes(word) || post.content.includes(word)) {
          results.add(post);
        }
      })
    })

    var template = document.getElementById("postTemplate")
    document.querySelector(".postContainer").innerHTML = '';
    document.querySelector(".postContainer").appendChild(template);

    document.getElementById("headerLF").innerHTML = "Results for: " + searchBarText;
    document.getElementById("postsTotal").innerHTML = results.size + " Posts"
    results.forEach(element => {
      createPost(element);
    })

    newestButtonFunction()
  }

  // ---------------------------------- section for adding a new community to communityArray  ----------------------------------

    document.getElementById("newCommunitySubmit").addEventListener('click', addCommunityToCommunityArray);
    function addCommunityToCommunityArray() {
      console.clear()
      console.log(document.getElementById("communityName").value);
      console.log(document.getElementById("CommuDescriptionInput").value);
      console.log(document.getElementById("communitysCreater").value);
    }



};






