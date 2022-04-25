import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callToAPI } from "./homeSlice";
import { Link, useParams } from "react-router-dom";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const newData = data.products;
  let params = useParams();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(Number(params?.page || 0));
  const elementsPerPage = 8;
  const start = currentPage * elementsPerPage;
  const end = start + elementsPerPage;
  const parcialData = newData.slice(start, end);
  const howManyPages = Math.ceil(newData.length / elementsPerPage);
  const arrayBtn = new Array(howManyPages).fill("buttonPage");

  useEffect(() => {
    dispatch(callToAPI());
  }, []);

  return (
    <>
      <input
        type="text"
        className="input"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="render">
        {parcialData.filter((el) => {
          if(search === ''){
            return el
          }else if(el.first_name.toLowerCase().includes(search.toLowerCase())){
            return el
          }
        }).map((user) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={user.id} style={{borderRadius: 20}}>
              <CardMedia style={{marginTop: 20}}
                component="img"
                height="150"
                image={user.image}
                alt="robots"
              />
              <div className="info">
                <Typography gutterBottom variant="h6" component="div">
                  {user.first_name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {user.last_name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {user.gender}
                </Typography>
              </div>
              <Button
                fullWidth
                onClick={() =>
                  setTocart((prev) => [
                    ...prev,
                    { title: title, price: price, quantity: quantity },
                  ])
                }
              >
                Add To Cart
              </Button>
            </Card>
          );
        })}
      </div>

      <div className="all-btn">
        <Link to={`/page/${currentPage < 1 ? 1 : currentPage}`}>
          <button
            className="btn prev"
            onClick={() => setCurrentPage((prev) => (prev < 1 ? 0 : prev - 1))}
          >
            Prev
          </button>
        </Link>
        {arrayBtn.map((page, index) => {
          return (
            <>
              <Link to={`/page/${index + 1}`} key={index + page}>
                <button
                  className="btn"
                  key={page + index}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </button>
              </Link>
            </>
          );
        })}
        <Link to={`/page/${currentPage > 13 ? 13 : currentPage + 1}`}>
          <button
            className="btn next"
            onClick={() =>
              setCurrentPage((prev) => (prev > 11 ? 12 : prev + 1))
            }
          >
            Next
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;