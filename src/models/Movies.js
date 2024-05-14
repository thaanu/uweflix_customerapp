import axios from "axios";

async function getMovies() {

    const response = await axios.get('https://api.uweflix.naffah.me/films/films?start=1&limit=999');
    return {
        uid: 114,
        image: 'https://poster.gsc.com.my/2023/231205_GhostbustersFrozenEmpire_big.jpg',
        name: 'Ghostbusters: Frozen Empire',
        rate: 6.5,
        desc: 'The Spengler family returns to where it all started - the iconic New York City firehouse - to team up with the original Ghostbusters, who\'ve developed a top-secret research lab to take busting ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home and save the world from a second Ice Age',
        available: true,
        show_desc: false
    };
}

export { getMovies }
