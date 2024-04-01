import React, { useEffect, useRef, useState } from 'react'
import { getCountryInfo } from 'sm-country-info'
import './GetCountryInfo.scss'

function GetCountryInfo() {

    const [countryInfo, setCountryInfo] = useState([])
    const [countryName, setCountryName] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const userInputText = useRef(null)

    console.log('country info : ', countryInfo);

    const fetchCountryInfo = async () => {
        try {

            setLoading(true)

            const countryData = await getCountryInfo(countryName ? countryName : 'Republic of India')

            setCountryInfo(countryData)

            console.log('Country Data:', countryData); // Add this log

            setLoading(false)

        } catch (error) {
            console.log(error);
            setError(error.message)

            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCountryInfo()
    }, [countryName])

    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const userInput = userInputText.current.value

            setCountryName(userInput)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='GetCountryInfo'>

            <h1 className='heading'>Country Insights</h1>

            <div className="userInput">
                <form className='inputForm' onSubmit={handleClick}>
                    <input className='inputTxt' type="text" ref={userInputText} placeholder='Republic of India' />
                    <button className='submit-btn' type='submit'>Get Country Info</button>
                </form>
            </div>

            {/* {loading && <p>Loading...</p>} */}
            {loading && <div class="loader"></div>}

            {error && <p>Error: {error}</p>}

            <div className="infoContainer">

                {countryInfo.length > 0 && (
                    <div className='countryDetails'>
                        <div className="details">

                            <div className="infoRow">
                                <p className="label">Country Name :</p>
                                <p className="value">{countryInfo[0]?.name?.common}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">Country Official Name :</p>
                                <p className="value">{countryInfo[0]?.name?.official}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">Capital :</p>
                                <p className="value">{countryInfo[0]?.capital}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">Population : </p>
                                <p className="value">{countryInfo[0]?.population}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">is Free : </p>
                                <p className="value">{countryInfo[0]?.independent ? 'Independent' : 'Not Independent'}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">Currency Name : </p>
                                <p className="value">{countryInfo[0]?.currencies?.INR?.name}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">Currency Symbol : </p>
                                <p className="value">{countryInfo[0]?.currencies?.INR?.symbol}</p>
                            </div>

                            <div className="infoRow">
                                <p className="label">is Landlocked Country : </p>
                                <p className="value">{countryInfo[0]?.landlocked ? "Landlocked Country" : "Not Landlocked Country"}</p>
                            </div>

                        </div>

                        <div className="coutryFlag">
                            <img className='flag' src={countryInfo[0].flags.svg} alt={countryInfo[0].flags.alt} />
                            <p className='flagDesc'>{countryInfo[0].flags.alt}</p>
                        </div>
                    </div>

                )}
            </div>


        </div>
    )
}

export default GetCountryInfo