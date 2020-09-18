import React from 'react';

const PageNotFound = () => {
    return (
        <section className="container shadow p-4 border bg-light rounded mt-4">
        <div className="error-page">
          <h2 className="headline text-warning"> 404 </h2>
  
          <div className="error-content">
            <h3 className="font-weight-bold"><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>
  
            <p className="p-2 font-weight-bold">
              Nous n'arrivons pas à trouver la page de vous éssayée d'accéder.
              Vous pouvez <a href="../../index.html">retourner à la page d'acceuil </a> ou éssayée le formulaire de recherche.
            </p>
  
            <form className="search-form">
              <div className="input-group">
                <input type="text" name="search" className="form-control" placeholder="Search" />
  
                <div className="input-group-append">
                  <button type="submit" name="submit" className="btn btn-warning"><i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
}

export default PageNotFound;