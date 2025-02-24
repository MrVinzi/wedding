import './App.css';

function App() { 
  
  return (
    <div className="App">
      <header className="App-header">
        <Intro />
       </header>
        <img src="Banner.png" className="App-img" alt="ooops" />
    </div>
  );
  {window.history.replaceState({}, '', "home")}
}

function Intro() {
  const queryString = new URLSearchParams(window.location.search);
  const value = queryString.get("USERID");
  sessionStorage.setItem('userId', value);
  const data = sessionStorage.getItem('userId')

  return <div className="intro"> Hello {data ? data : 'anonymous' }</div>
}



export default App;
