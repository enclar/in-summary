const Home = () => {
    // accessing local storage
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="home">
            {
                !currUser ?
                <h1>please log in to view the home page</h1> :
                <h1>you are logged in!</h1>
            }
        </div>
    )
}

export default Home;