// 3bec3e48dc44dbc52fa072dd0f688ebe190648b1

class Data{
    constructor(username){
      this.userName = username; 
    }
    
    async getUserInfo(){
        let mainData=await fetch(`https://api.github.com/users/${this.userName}/3bec3e48dc44dbc52fa072dd0f688ebe190648b1`)
        .then(function(data){
            return data.json();
        })
        
            return{
                repos: mainData.public_repos,
                gists: mainData.public_gists,
                followers: mainData.followers,
                following: mainData.following,
                company :mainData.company,
                location: mainData.location,
                member: mainData.created_at,
                blog: mainData.blog,
                avatar_url: mainData.avatar_url,
                html_url: mainData.html_url,
                login: mainData.login
            }
        
        // return mainData;
    }
    async getRepositories(){
        let reposData=await fetch(`https://api.github.com/users/${this.userName}/3bec3e48dc44dbc52fa072dd0f688ebe190648b1/repos?sort=updated`)
        .then(function(data){
            return data.json();
        })
        let reposSpecialData=[]
            for(let i=0;i<reposData.length;i++){
                reposSpecialData.push({
                    name:reposData[i].name,
                    stargazers_count: reposData[i].stargazers_count,
                    watchers_count: reposData[i].watchers_count,
                    forks_count: reposData[i].forks_count
                });
            } 
            return(reposSpecialData);
        // return reposData;
    }

}


class Ui{
    constructor(){
        this.repos = document.getElementById('repos');
        this.gists = document.getElementById('gists');
        this.followers = document.getElementById('followers');
        this.following = document.getElementById('following');
        this.company = document.getElementById('company');
        this.blog = document.getElementById('blog');
        this.location = document.getElementById('location');
        this.member = document.getElementById('member');
        this.repositories = document.getElementById('reposDiv');
        this.picture = document.getElementById('profilePicture');
        this.profile = document.getElementById('profile');
    }
    showUserInfo(data){
        if(data.login===undefined){

            this.repos.textContent =`Public Repos`;
            this.gists.textContent =`Public Gists`;
            this.followers.textContent = `Followers`;
            this.following.textContent = `Following`;
            this.company.textContent = `Company: `;
            this.blog.textContent = `Website/Blog: `;
            this.location.textContent = `Location: `;
            this.member.textContent = `Member Since: `;
            this.picture.removeAttribute("src", data.avatar_url);
            this.profile.removeAttribute('href', data.html_url);
        }
        else{
            this.repos.textContent =`Public Repos ${data.repos}`;
            this.gists.textContent =`Public Gists ${data.gists}`;
            this.followers.textContent = `Followers ${data.followers}`;
            this.following.textContent = `Following ${data.following}`;
            this.company.textContent = `Company: ${data.company}`;
            this.blog.textContent = `Website/Blog: ${data.blog}`;
            this.location.textContent = `Location: ${data.location}`;
            this.member.textContent = `Member Since: ${data.member}`;
            this.picture.setAttribute("src", data.avatar_url);
            this.profile.setAttribute('href', data.html_url);
        }
    }


    showRepositories(data){
        if(data.length===0){
            // console.log('No repositories');
            let h3 = document.createElement('h3');
            h3.className='text-center text-secondary';
            h3.innerHTML='------There is no repositories------';
            this.repositories.appendChild(h3);
        }
        else{
            for(let i=0;i<data.length;i++){

                let latestRepos = document.createElement('div');
                latestRepos.className ='w-100 p-3 border rounded border-dark mt-2';
                latestRepos.id = 'reposDiv';
                latestRepos.textContent = data[i].name;
    
                let watcher = document.createElement('div');
                watcher.className = 'd-inline-block bg-secondary p-1 border rounded float-right text-white';
                watcher.textContent = `Watcher ${data[i].watchers_count}`;
    
                let forks = document.createElement('div');
                forks.className = 'd-inline-block bg-success p-1 border rounded float-right text-white';
                forks.textContent = `Forks ${data[i].forks_count}`;
    
                let star = document.createElement('div');
                star.className ='d-inline-block bg-primary p-1 border rounded float-right text-white';
                star.textContent = `Star ${data[i].stargazers_count}`;
                this.repositories.appendChild(latestRepos);
                latestRepos.appendChild(star);
                latestRepos.appendChild(watcher);
                latestRepos.appendChild(forks);
            }

        }
    }
    empty(){
        while(this.repositories.hasChildNodes()){
            this.repositories.removeChild(this.repositories.firstChild);
        }
    }
}
// submit
// document.getElementById('searchUser')

document.getElementById('searchUser').addEventListener('keyup',function(e){
    let name = e.target.value;
    let data = new Data(name);
    let ui = new Ui();
  
        if(name===""){
            alert('Please enter a Valid name');
        }else{
            data.getUserInfo()
            .then(function(data){
                console.log(data);
                ui.showUserInfo(data);
                // ui.showProfilePic();
            });
            
            data.getRepositories()
            .then(function(data){
                ui.empty();
                // console.log(data);
                ui.showRepositories(data);  
            })
      
        }
});



