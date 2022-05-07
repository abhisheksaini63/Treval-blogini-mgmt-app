import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../Home/nav/Nav";
import axios from "axios";
import Select from 'react-select';

const CreatePost = () => {
    const [selectedOption, setSelectedOption] = useState();
    const [val, setval] = useState();
    const [Weather, setWeather] = useState();
    var z= []
    const [inputOne, setInputOne] = useState();
    const [inputTwo, setInputTwo] = useState();
    const options = [
        { value: 'weather', label: 'weather' },
        { value: 'slide show', label: 'slide show' },
    ];
    // const location = useLocation();
    // let updateTitle;
    // let ondel ;
    // let updateContent;
    // if (location.state) {
    //     const ldata = location.state;
    //     console.log(ldata);
    //     // console.log(ldata.title);
    //     // ondel = location.state.onDelete;
    //     updateTitle = ldata.title;
    //     updateContent = ldata.content;

    // }
    // const history = useHistory();
    // const [posts, setposts] = useState({
    //     title: updateTitle ? updateTitle : "",
    //     contnet: updateContent ? updateContent : ""
    // })
    // const handler = (e) => {
    //     const { name, value } = e.target;

    //     setposts({
    //         ...posts,
    //         [name]: value
    //     })
    // }
    // const posted = () => {
    //     if (posts.title === '' || posts.contnet === '') {
    //         alert("Please write a note ");
    //     }
    //     else {
    //         axios.post("http://localhost:9002/posts", posts)
    //             .then(res => {
    //                 alert(res.data.message)
    //                 history.push("/")
    //             }).then(() => {
    //                 const onDelete = async (e) => {
    //                     console.log(e);
    //                     try {
    //                         await axios.delete(`http://localhost:9002/posts/${e}`)
    //                             .then(res => {
    //                                 // console.log(res);
    //                                 alert(res.data.message)
    //                                 history.push('/');

    //                             })
    //                     }
    //                     catch (err) {
    //                         console.log(err);
    //                     }
    //                 }
    //                 if (updateContent && updateTitle) {
    //                     alert("update Successfull");
    //                     onDelete(location.state.id)
    //                 }
    //             })
    //     }
    // }

    const changeHandler = (event) => {
        if (event) {
            event.preventDefault();
            setWeather(event.target.value);
        }
    }
    const inputOneChangeHandler = (event) => {
        if (event) {
            event.preventDefault();
            setInputOne(event.target.value);
        }
    }
    const inputTwoChangeHandler = (event) => {
        if (event) {
            event.preventDefault();
            setInputTwo(event.target.value);
        }
    }
    const CreateWeatherWidget = async () => {
        let mail = localStorage.getItem('email');
        let data = { name: "weatherWidget", cityName: Weather, position : { x: 0, y: 0 }, userEmail: mail }
        await axios.post('http://localhost:9002/addwidget', data).then(res => {
            if (res)
                alert("Added Successfully");
        })
        setWeather('');
    }
    const CreateSlideWidget = async () => {
        let mail = localStorage.getItem('email');
        z.push(inputOne);
        z.push(inputTwo);
        let data = { name: "slideWidget", img: z, position : { x: 20, y: 20 }, userEmail: mail }
        await axios.post('http://localhost:9002/addwidget', data).then(res => {
            if (res)
                alert("Added Successfully");
        })
    }
    const handleChange = (op) => {
        setSelectedOption(op.value);
        // setval(op.value)
        console.log(selectedOption);
    }
    const optionW = () => {
        return <div>
            <input
                onChange={e => changeHandler(e)}
                placeholder="Please enter a valid zip code..."></input>
            <button className="post" onClick={CreateWeatherWidget}>Submit</button>
        </div>
    }
    const optionS = () => {
        return <div>
            <input
                onChange={(e) => inputOneChangeHandler(e)}
                placeholder="Please enter a valid image url..."></input>
            <input
                onChange={(e) => inputTwoChangeHandler(e)}
                placeholder="Please enter a valid Video url..."></input>
            <button className="post" onClick={()=>CreateSlideWidget()}>Submit</button>
        </div>
    }

    return (
        <>
            <Navbar />
            <div className="createPost">
                <h1>Create A New Post</h1>

                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                />
                {
                    selectedOption == 'weather' ? optionW() : (selectedOption == 'slide show' ? optionS() : '')

                }
                {/* 

                <textarea rows="1" cols="50"
                    name="title"
                    placeholder="Write title "
                    name="title"
                    value={posts.title}
                    onChange={handler}
                />
                <textarea rows="10" cols="50"
                    name="contnet"
                    placeholder="Write a note "
                    value={posts.contnet}
                    onChange={handler}
                /> */}
                {/* <button className="post" onClick={posted}>Post</button> */}
            </div>
        </>

    )
}
export default CreatePost;