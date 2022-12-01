const Home = () => {
    // accessing local storage
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    return (
        <>
            {
                !currUser ?
                <div
                    id="home"
                    className="my-10 flex items-center justify-center"
                >
                    <h1 id="no-login-msg">please log in to view this page</h1>
                </div>
                :
                <div
                    id="home"
                    className="my-10 flex items-center justify-center"
                >
                    <h1 id="no-login-msg">you are logged in!</h1>
                </div>
            }
        </>
    )
}

export default Home;