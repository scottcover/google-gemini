import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        What is Google Gemini:
      </Typography>
      <Typography variant="body1" paragraph>
        Google Gemini is an AI-powered assistant that's available in multiple Google products, including Gmail, Docs, Sheets, Google Cloud, and the Gemini mobile app. Gemini is designed to help users be more productive and creative by acting as a writing and coding assistant, creative designer, expert adviser, and data analyst.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Here are some of the things Gemini can do:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Research: Help users identify business opportunities, synthesize information, and spot trends" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Sales: Help users create pitch materials to speed up revenue and progress sales opportunities" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Marketing: Help users generate campaign briefs, project plans, and presentations" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Coding: Help users answer coding questions and provide guidance on coding best practices" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Learning: Help users learn in new ways" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Event planning: Help users plan events" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Image generation: Help users generate images on the fly" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Summarizing: Help users summarize and find quick information from Google Drive or Gmail" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Making plans: Help users make plans with Google Flights and Google Maps" />
        </ListItem>
      </List>
      <Typography variant="body1" paragraph>
        Gemini is built with responsible AI in mind, allowing users to track sources and connect AI's responses directly to their own data. Gemini also ensures that every user and organization has control over their data.
      </Typography>
    </Container>
  );
}

export default Home;
