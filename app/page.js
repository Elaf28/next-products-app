"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { Link } from "lucide-react";

export default function Home() {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await axios.get("/api/home");

        setData(res.data.message);
      } catch (error) {
        setErrors(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#b1ddff",
      }}
    >

      {loading && (
        <CircularProgress sx={{ mt: 3 }} />
      )}

      {errors && (
        <Typography color="error" mt={2}>
          {errors}
        </Typography>
      )}

      {data && (
        <Typography variant="h5" mt={3}>
          {data}
        </Typography>
      )}
      <Typography mt={2}>
        Discover amazing products with the best prices
      </Typography>
      <Button
        variant="contained"
        // component={Link}
        href='/products'
        size="large"
        sx={{
            mt: 3,
            backgroundColor: "white",
            color: "#1976d2",
            "&:hover": {
            backgroundColor: "#e3f2fd",
            },
        }}
      >
        Shop Now
      </Button>
    </Box>
  );
}