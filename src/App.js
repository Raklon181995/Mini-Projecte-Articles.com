 import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './components/ArticleList';
import Form from './components/Form';
// import {Route, Switch } from "react-router-dom";
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
// import About from './components/About';





function App() {
 
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState(null)
  const [token, setToken, removeToken] = useCookies(['mytoken'])

  let history = useHistory()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/articles/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':`Token ${token['mytoken']}` 
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))

  }, [])


  useEffect(() => {
    if(!token['mytoken']) {
        history.push('/')
        //window.location.href = '/'
       
    }
}, [token])




  const editBtn = (article) => {
    setEditArticle(article)

  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if(myarticle.id === article.id) {
        return article;
      }
      else {
        return myarticle;
      }
    })

    setArticles(new_article)

  }

  const articleForm = () => {
    setEditArticle({title:'', description:''})

  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)

  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id) {
        return false
      }
      return true;
    })

    setArticles(new_articles)

  }

  const logoutBtn = () => {
    removeToken(['mytoken'])

  }

  return (
    
    <div className="home">
     
      <div class="nav">
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
          <a class="navbar-brand" href="#"><h2>ARTICLES.com</h2></a>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link"> 
                <div className = "col">
                  <button onClick = {articleForm} className = "btn btn-dark ">ADD ARTICLES</button>
                </div>
              </a>
            </li>
            
            
            <li class="nav-item  navbar-right">
              <a class="nav-link ">
                <div className = "col ">
                    <button className = "btn btn-dark" > <a href="#"></a>COMPANY</button>
                </div>
              </a>
            </li>

           

            <li class="nav-item  ">
              <a class="nav-link ">
                <div className = "col ">
                    <button onClick = {logoutBtn} className = "btn btn-dark " >Logout</button>
                </div>
              </a>
            </li>
          
          
            
          </ul>
        </nav>
      </div>
      <br/><br/><br/><br/>
      <div className = "row">
        
      <div className = "col">
        <br/>
        </div>
      </div>
        <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn}/>
        
        {editArticle ? <Form article = {editArticle} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation}/> : null}
        
        <br/>
    </div>
    
  );
}

export default App;
