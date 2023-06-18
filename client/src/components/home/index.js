import React from "react";

class Home extends React.Component {

    

    render() {
        return (

            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <h2 class="section-heading">O nas</h2>

                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="service-box mt-5 mx-auto">
                                <h3 class="mb-3">Stomatologia</h3>
                                <p class="text-muted mb-0">Naszym pacjentom oferujemy szeroki zakres usług stomatologicznych.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="service-box mt-5 mx-auto">
                                <h3 class="mb-3">Doświadczeni lekarze</h3>
                                <p class="text-muted mb-0">Nasi lekarze to specjaliści w swoich dziedzinach z wieloletnim doświadczeniem.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="service-box mt-5 mx-auto">

                                <h3 class="mb-3">Nowoczesne wyposażenie</h3>
                                <p class="text-muted mb-0">Nasz gabinet jest wyposażony w najnowocześniejszy sprzęt.</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 text-center">
                            <div class="service-box mt-5 mx-auto">


                                <h3 class="mb-3">Szybka rejestracja</h3>
                                <p class="text-muted mb-0">Rejestracja wizyty jest prosta i szybka, dostępna przez internet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;