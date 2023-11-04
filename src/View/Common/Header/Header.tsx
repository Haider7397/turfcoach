import "View/Styles/header.css"

export const Header = () =>{
    return(
        <div className="site-header">
            <div className="container">
                <a href="index.html" className="branding">
						<img src="images/sun.png" alt="" className="logo" />
						<div className="logo-type">
							<h1 className="site-title">Weather</h1>
							<small className="site-description">Stay tuned to us</small>
						</div>
					</a>
            </div>
        </div>
    )
}