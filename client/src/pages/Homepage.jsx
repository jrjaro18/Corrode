import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { MdSearch } from "react-icons/md";
import ReactModal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
  const strings = ['Used by Democrats . . . ', 'Used by Republicans . . . ', 'Used by Independents . . . ', 'Used by ISIS . . . ', 'Start Using Now . . . ']
  const instructions = ['1. Enter your text in the text box.', '2. Select the news articles you want to post.', '3. Click on the "Corrodé" button.', "Yayyy! You've successfully Corrodéd the news!🥳"]

  const [fetchedArticles, setFetchedArticles] = useState([])
  const [selectedArticles, setSelectedArticles] = useState([])
  const [invitationId, setInvitationId] = useState('')
  const [search, setSearch] = useState('')
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('user_corrode') ? true : false)
  const [modalOpen, setModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const invitationSubmit = async (e) => {
    e.preventDefault()
    console.log(invitationId)
    try {
      const res = await axios.post('http://127.0.0.1:8000/check-user', { user: invitationId })
      console.log(res)
      if (res.status === 200) {
        sessionStorage.setItem('user_corrode', res.data.user)
        setModalOpen(false)
        setLoggedIn(true)
        setFetchedArticles([])
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        
        toast.success('Logged In Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (res.status === 205) {
        console.log('404')
        toast.error('We are invite-only! Maybe sometimes later!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      }
    } catch (err) {
      console.log(err)
    }
  }

  const searchSubmit = async (e) => {
    e.preventDefault()
    console.log(search)
    if (search.length === 0) {
      toast.error('Enter Some Text!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return
    } else {
      try {
        setLoading(true)
        sessionStorage.setItem('search', search)
        const encodedSearch = encodeURIComponent(search);
        console.log(encodedSearch);
        const res = await axios.get(`http://127.0.0.1:8000/get-news?query=${encodedSearch}`);
        setFetchedArticles(res.data.articles);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err);
      }
      setSearch('')
      setSelectedArticles([])
    }
  }

  const corrodeSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const temp = []
      selectedArticles.forEach((index) => {
        temp.push(fetchedArticles[index])
      })
      console.log(temp)
      const res = await axios.post('http://127.0.0.1:8000/post-news', { articles: temp })
      console.log(res)
      if (res.status === 200) {
        setFetchedArticles([])
        setSelectedArticles([])
        setLoading(false)
        toast.success('News Article(s) Posted Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        toast.error('Something went terribly wrong!!!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false)
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setUser(sessionStorage.getItem('user_corrode'))
    if (user) {
      setLoggedIn(true)
    }
    console.log(loggedIn)
  }, [user])


  const onSelectArticle = (index) => {
    if (selectedArticles.includes(index)) {
      setSelectedArticles(selectedArticles.filter(item => item !== index))
    } else {
      setSelectedArticles([...selectedArticles, index])
    }
  }

  useEffect(() => {
    console.log(selectedArticles)
  }, [selectedArticles])

  return (
    <div id="page" className="min-h-[100vh]">
      <div id="left" className="left-0 w-3/12 h-full fixed bg-[rgb(255,250,250)] overflow-y-auto">
        <div className="flex items-center justify-center mt-9 flex-col">
          <div className="flex items-center">
            <a href='http://localhost:5173' id='left_title_name' className="text-gray-950 tracking-wider font-extralight text-[4vw]">
              Corrodé
            </a>
          </div>
          <div id="typewriter_left_1" className="font-bold text-xs tracking-wider">
            <Typewriter
              options={{
                strings: strings,
                autoStart: true,
                loop: true,
                delay: 300,
                deleteSpeed: 50,
                pauseFor: 5000,
              }}
            />
          </div>
          <div className="p-3 tracking-wider leading-loose mt-7 text-justify">
            In the digital age, information has become the new weapon, wielding the power to shape opinions, influence decisions, and even spark revolutions. With data at our fingertips, the ability to harness and deploy information strategically can be as impactful as any traditional arsenal. Corrodé is a tool that allows you to do just that.
          </div>
        </div>
        <div className="p-3 tracking-wider leading-loose mt-1 text-end">
          a jrjaro18 product
        </div>
        <div className="flex justify-center mt-7">
          {
            !loggedIn ?
              (
                <button class="bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded duration-100 w-3/4"
                  onClick={() => setModalOpen(true)}
                >
                  Login
                </button>
              ) : (
                <button class="bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded duration-100 w-3/6 disabled:opacity-75"
                  disabled={selectedArticles.length === 0}
                  style={{
                    cursor: selectedArticles.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                  onClick={(e) => corrodeSubmit(e)}
                >
                  Corrode
                </button>
              )
          }

        </div>
      </div>
      <div id="right" className="absolute right-0 bg-[rgb(255,250,250)] w-9/12 min-h-[100vh] px-10 border-l-2 border-red-800">
        {
          loading ? (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-5 w-96">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold">
                    Corroding News . . .
                  </div>
                </div>
                <div className="mt-5">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="/loading.json"
                    style={{ width: '100%', height: '100%', margin: 'auto' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div id='search' className="flex justify-between items-center">
                <div className="w-96">
                  <div id='search' className="text-sm text-gray-900 font-medium">
                    <form onSubmit={searchSubmit} className="relative">
                      <input type="text" id='search_input' placeholder="character limit 25" className="outline-none pl-3 w-full p-2 text-red-900 bg-gray-50 rounded-full tracking-wider absolute border-red-800 border-[1px]" maxLength={25} disabled={!loggedIn} onChange={(e) => setSearch(e.target.value)} />
                      <button type='submit' className="absolute right-2 top-2">
                        <MdSearch
                          size={20}
                          className="text-gray-900 hover:text-red-900 duration-200 cursor-pointer"
                        />
                      </button>
                    </form>
                  </div>
                </div>
                <div className=" text-end cursor-none mt-10">
                  <div id='use_title' className="text-lg font-light">
                    How To Use?
                  </div>
                  <div className="text-sm tracking-wider text-gray-900 font-semibold">
                    <Typewriter
                      options={{
                        strings: instructions,
                        autoStart: true,
                        loop: true,
                        delay: 90,
                        deleteSpeed: 30,
                        pauseFor: 2000,
                      }}
                    />
                  </div>
                </div>
              </div>
              {
                loggedIn ? (
                  <>
                    {
                      fetchedArticles.length > 0 ? (
                        <>
                          <div className="mt-5 ml-2 flex items-center gap-x-3">
                            <div className="tracking-wider text-xs text-gray-800 font-semibold">
                              Showing News for:
                            </div>
                            <div id='search_name' className="tracking-wide text-lg">
                              {sessionStorage.getItem('search')}
                            </div>
                          </div>
                          <div id='content' className="flex flex-wrap justify-evenly">
                            {fetchedArticles.map((article, index) => {
                              return (
                                <div key={index} id="content_box" className="w-[22vmax] p-2 my-3 hover:-translate-y-1 cursor-pointer duration-200"
                                  onClick={() => onSelectArticle(index)}
                                  style={selectedArticles.includes(index) ? { backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '7px' } : { backgroundColor: 'rgba(0, 0, 0, 0)' }}
                                >
                                  <div className="bg-white rounded-lg shadow-lg">
                                    <div className="bg-cover bg-center h-56 p-4 rounded-md" style={{ backgroundImage: `url(${article.urlToImage})` }}>
                                    </div>
                                    <div className="p-4">
                                      <p className="uppercase tracking-wide text-sm font-bold text-gray-700">{article.source.name}</p>
                                      <div className="text-3xl text-gray-900 h-36 first-letter overflow-hidden">{article.title.slice(0, 55)}</div>...
                                      <a href={article.url} target="_blank" rel="noreferrer" className="block mt-5 text-lg text-gray-600 hover:text-red-800">Link to the article</a>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          <lottie-player
                            autoplay
                            loop
                            mode="normal"
                            src="/empty.json"
                            style={{ width: '60%', height: '60%', margin: 'auto', marginTop: '5%' }}
                          />
                        </>
                      )
                    }

                  </>
                ) : (
                  <>
                    <lottie-player
                      autoplay
                      loop
                      mode="normal"
                      src="/loggedin.json"
                      style={{ width: '80%', height: '80%', margin: 'auto' }}
                    />
                  </>
                )
              }
            </>
          )}
      </div>
      {
        selectedArticles.length > 0 &&
        <div
          id="bottom"
          className="fixed text-end bottom-1 right-3 p-2 bg-black text-white rounded-full text-sm tracking-wider"
        >
          Selected News Articles: {selectedArticles.length}
        </div>
      }
      <ReactModal isOpen={modalOpen} preventScroll={true} shouldCloseOnOverlayClick={true} className='w-min h-min'>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-5 w-96">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                Login
              </div>
              <div id='cross' className="text-xs cursor-pointer px-1 bg-red-400 text-white rounded-full"
                onClick={() => setModalOpen(false)}
              >
                X
              </div>
            </div>
            <form
              onSubmit={(e) => invitationSubmit(e)}
            >
              <div className="mt-5">
                <div>
                  <input type="text" id='search_input' placeholder="Enter your invitation id" className="outline-none pl-3 w-full p-2 text-red-900 bg-gray-100 rounded-md tracking-wider border-red-800 border-[1px]" maxLength={25}
                    onChange={(e) => setInvitationId(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-5">
                <button type='submit' class="bg-transparent hover:bg-red-400 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded duration-100 w-full">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </ReactModal >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div >
  );
}

export default Homepage;
