import Carousel from 'react-material-ui-carousel'
import Item from './Item';

const Banner = () => {


    const items = [
        {
            "title": "Empower Your Team, Elevate Your Success",
            "image": "https://i.ibb.co/rsfmvwR/img1.jpg"
        },
        {
            "title": "Efficiency in Workforce Management",
            "image": "https://i.ibb.co/YPsZT0K/img2.jpg"
        },
        {
            "title": "Navigating Productivity Together",
            "image": "https://i.ibb.co/MB2vh83/img3.jpg"
        },
        {
            "title": "Streamlining Employee Success",
            "image": "https://i.ibb.co/thdgnR0/img4.jpg"
        }
    ]


    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item}></Item>)
            }
        </Carousel>
    )
}

export default Banner;
