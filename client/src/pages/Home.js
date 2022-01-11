import { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components'
import Featured from '../components/Featured'
import MovieList from '../components/MovieList'
import Navbar from '../components/Navbar'

const HomeContainer = styled.div`
    background-color: #0b0b0b;
    overflow: hidden;
`
const Home = ({ type }) => {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDZlM2ZiYzgwYTkwNTI4OTNiZWM5NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTkwMzYxMiwiZXhwIjoxNjQyMzM1NjEyfQ.TSWRIxRSgjSWJ8592j6tuZbxxeDPfxo0-wasanCADkU" }
                });
                console.log(res.data)
                setLists(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getRandomLists();
    },[type, genre])

    return (
        <HomeContainer>
            <Navbar />
            <Featured type={type} />
            {lists.map(list => <MovieList key={list._id} list={list} />)}
        </HomeContainer>
    )
}

export default Home
