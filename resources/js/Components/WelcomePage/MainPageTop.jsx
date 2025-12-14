export default function MainPageTop(){
    return(
        <div className='MainTopWrapper'>
            <div className='MainTopContent'>
                <section className="imgBox">
                    <img src="images/musico-guitar.png" alt="Guitar" />
                </section>

                <section className="textBox">
                    <div className="textBox-content">
                        <p>Mūzikas vērtība tiek atklāta kopienā.</p>
                        <a class="btn" href={route('register')}>Sāc jau tagad.</a>
                    </div>
                </section>
            </div>
        </div>
    )
}