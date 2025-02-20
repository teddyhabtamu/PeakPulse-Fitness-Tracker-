import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlogCard from "../components/cards/BlogCard";
import BlogForm from "../components/BlogForm";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.background};
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
    padding: 0 16px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`;
const BlogTitle = styled.div`
  font-weight: 600;
  font-size: 22px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const ToggleButton = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.button_text};
  background-color: ${({ theme }) => theme.button_background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: fixed;
  top: 100px; /* Adjusted to be below the nav bar */
  right: 20px;
  z-index: 100;
  &:hover {
    background-color: ${({ theme }) => theme.button_hover};
  }
`;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  useEffect(() => {
    // Simulating fetching blog posts
    const fetchedPosts = [
      {
        id: 1,
        title: <BlogTitle>Best Ways to Stay Fit</BlogTitle>,
        content: `
          There are a lot of ways to stay fit, but some are better than others. In this blog post, we will explore the best ways to keep fit, so that you can choose the method that works best for you. From diet and exercise to sleep and stress management, we will cover all the bases.

          **What are the best ways to keep fit?**
          The best way to stay fit is to exercise regularly and eat a healthy diet. However, there are other things you can do to help yourself stay in shape. Here are some tips:

          - Get plenty of sleep. Sleep is when your body repairs itself, so it’s important to get enough rest.
          - Drink plenty of water. Staying hydrated helps your body function properly and can also help prevent overeating.
          - Avoid processed foods and sugary drinks. These foods can sabotage your efforts to stay fit by making you crave more unhealthy food and causing you to feel tired.
          - Make sure to get some protein every day. Protein provides the building blocks for muscles, so it’s important to include it in your diet if you want to stay toned.
          - Take breaks throughout the day to move around. Even just a few minutes of walking or stretching can help increase your energy level and prevent stiffness.

          **There are countless ways to stay fit, but here are 8 of the most effective:**

          1. **Get plenty of sleep:** Most people need around 7–8 hours of sleep per night. Getting enough sleep helps to regulate hormones, repair muscles, and boost immunity.
          2. **Eat a healthy diet:** Eating whole foods, plenty of fruits and vegetables, and avoiding processed foods can help keep you fit.
          3. **Exercise regularly:** A combination of cardio and strength training is best for staying fit. Aim for at least 30 minutes of moderate exercise most days of the week.
          4. **Stay hydrated:** Drinking plenty of water throughout the day helps to keep your body functioning properly and can prevent fatigue.
          5. **Avoid smoking:** Smoking damages your lungs and increases your risk for various diseases. It’s best to avoid it altogether if you want to stay fit.
          6. **Limit alcohol consumption:** Too much alcohol can lead to weight gain and other health problems. Moderation is key when it comes to drinking alcohol.
          7. **Manage stress levels:** Stress can take a toll on your physical and mental health, so it’s important to find ways to manage it effectively. Yoga, meditation, and deep breathing are all great stress-relievers.
          8. **Get regular checkups:** Seeing your doctor for regular checkups can help catch any health issues early on and ensure that you stay as healthy as possible.
        `,
      },
      {
        id: 2,
        title: <BlogTitle>The Importance of Warm-Up and Cool-Down</BlogTitle>,
        content: `
          Proper warm-up and cool-down routines are crucial for preventing injuries and ensuring optimal performance. This blog post highlights the importance of these routines and provides practical tips.

          **Warm-Up:**
          - Increases blood flow to muscles
          - Prepares the body for intense physical activity
          - Reduces the risk of injury

          **Cool-Down:**
          - Helps gradually lower heart rate
          - Reduces muscle stiffness and soreness
          - Promotes relaxation

          Incorporating dynamic stretches in your warm-up and static stretches in your cool-down can significantly enhance your fitness routine.
        `,
      },
      {
        id: 3,
        title: <BlogTitle>Top 5 Benefits of Strength Training</BlogTitle>,
        content: `
          Strength training is not just for bodybuilders. It's an essential part of a balanced fitness routine. Here are the top 5 benefits:

          1. **Increases Muscle Mass:** Helps in building and maintaining muscle mass.
          2. **Boosts Metabolism:** More muscle means higher calorie burn, even at rest.
          3. **Enhances Bone Health:** Weight-bearing exercises strengthen bones.
          4. **Improves Mental Health:** Releases endorphins that help reduce stress and anxiety.
          5. **Increases Functional Strength:** Makes daily activities easier and safer.

          Incorporate strength training exercises like squats, deadlifts, and bench presses into your routine for overall health benefits.
        `,
      },
      {
        id: 4,
        title: <BlogTitle>The Role of Nutrition in Fitness</BlogTitle>,
        content: `
          Nutrition plays a vital role in achieving fitness goals. This blog post discusses the importance of a balanced diet and provides guidelines for proper nutrition.

          **Key Nutrients:**
          - **Proteins:** Essential for muscle repair and growth.
          - **Carbohydrates:** Primary source of energy for workouts.
          - **Fats:** Important for hormone production and overall health.
          - **Vitamins and Minerals:** Support various bodily functions and improve performance.

          A well-balanced diet that includes a variety of nutrients can enhance your fitness results and overall well-being.
        `,
      },
      {
        id: 5,
        title: <BlogTitle>Mental Health and Physical Fitness</BlogTitle>,
        content: `
          Physical fitness is closely linked to mental health. Regular exercise can improve mood, reduce anxiety, and increase overall mental well-being. This blog post explores the connection between mental health and physical fitness.

          **Benefits of Exercise on Mental Health:**
          - **Reduces Stress:** Physical activity reduces levels of stress hormones.
          - **Improves Mood:** Exercise releases endorphins, which are natural mood lifters.
          - **Enhances Cognitive Function:** Regular exercise can improve memory and thinking skills.
          - **Promotes Better Sleep:** Physical activity helps regulate sleep patterns.

          Incorporating regular exercise into your routine can have profound positive effects on your mental health.
        `,
      },
      {
        id: 6,
        title: <BlogTitle>Effective Home Workouts</BlogTitle>,
        content: `
          You don't need a gym to stay fit. Effective home workouts can be done with minimal or no equipment. This blog post provides a guide to some of the best exercises you can do at home.

          **Bodyweight Exercises:**
          - **Push-Ups:** Great for upper body strength.
          - **Squats:** Excellent for lower body and core.
          - **Planks:** Strengthen the core and improve stability.

          **Minimal Equipment Workouts:**
          - **Resistance Bands:** Versatile and effective for strength training.
          - **Dumbbells:** Great for a variety of exercises targeting different muscle groups.

          With consistency and proper technique, home workouts can be just as effective as gym workouts.
        `,
      },
    ];
    setPosts(fetchedPosts);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Fitness Blog</Title>
        <ToggleButton onClick={() => setShowForm(true)}>
          Post a Blog
        </ToggleButton>
        {showForm && (
          <BlogForm addPost={addPost} closeForm={() => setShowForm(false)} />
        )}
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Blogs;
