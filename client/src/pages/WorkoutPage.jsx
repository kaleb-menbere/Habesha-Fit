// src/pages/WorkoutPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiClock, FiTarget, FiActivity, FiArrowLeft, 
  FiPlay, FiInfo, FiChevronRight, FiStar
} from 'react-icons/fi';
import { BiDumbbell, BiTime, BiBody } from 'react-icons/bi';
import { workoutCategories, featuredWorkouts } from '../data/WorkoutTypes';
import './WorkoutPage.css';

export default function WorkoutPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedExercise(null);
    setShowExerciseDetail(false);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseDetail(true);
  };

  const handleBack = () => {
    if (showExerciseDetail) {
      setShowExerciseDetail(false);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate('/');
    }
  };

  const categories = Object.values(workoutCategories);

  return (
    <div className="workout-page">
      {/* Header */}
      <div className="workout-header">
        <button className="back-btn" onClick={handleBack}>
          <FiArrowLeft />
        </button>
        <h1>
          {showExerciseDetail 
            ? selectedExercise?.name 
            : selectedCategory 
              ? workoutCategories[selectedCategory]?.name 
              : 'Workouts'}
        </h1>
        {!showExerciseDetail && !selectedCategory && (
          <button className="filter-btn">
            <FiTarget />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="workout-content">
        {!selectedCategory && !showExerciseDetail && (
          <>
            {/* Featured Section */}
            <section className="featured-section">
              <h2>Featured Workouts</h2>
              <div className="featured-grid">
                {featuredWorkouts.map(workout => (
                  <div 
                    key={workout.id} 
                    className="featured-card"
                    style={{ background: workout.color }}
                    onClick={() => handleCategoryClick(workout.category)}
                  >
                    <span className="featured-emoji">{workout.image}</span>
                    <div className="featured-info">
                      <h3>{workout.name}</h3>
                      <div className="featured-meta">
                        <span><BiTime /> {workout.duration}</span>
                        <span className="difficulty">{workout.difficulty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
              <h2>Exercise Categories</h2>
              <div className="categories-grid">
                {categories.map(category => (
                  <div
                    key={category.id}
                    className="category-card"
                    style={{ background: category.color }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <div className="category-footer">
                      <span>{category.exercises.length} exercises</span>
                      <FiChevronRight />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Exercise List View */}
        {selectedCategory && !showExerciseDetail && (
          <div className="exercise-list-view">
            <div className="category-header">
              <span className="category-icon-large">
                {workoutCategories[selectedCategory]?.icon}
              </span>
              <h2>{workoutCategories[selectedCategory]?.name}</h2>
              <p>{workoutCategories[selectedCategory]?.description}</p>
            </div>

            <div className="exercises-grid">
              {workoutCategories[selectedCategory]?.exercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="exercise-card"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <div className="exercise-card-header">
                    <span className="exercise-emoji">{exercise.image}</span>
                    <span className="exercise-difficulty">{exercise.difficulty}</span>
                  </div>
                  <h3>{exercise.name}</h3>
                  <p className="exercise-description">{exercise.description}</p>
                  <div className="exercise-meta">
                    <span><FiClock /> {exercise.duration}</span>
                    <span><BiBody /> {exercise.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercise Detail View */}
        {showExerciseDetail && selectedExercise && (
          <div className="exercise-detail-view">
            <div 
              className="detail-header"
              style={{ background: workoutCategories[selectedCategory]?.color }}
            >
              <span className="detail-emoji">{selectedExercise.image}</span>
              <h2>{selectedExercise.name}</h2>
              <div className="detail-badges">
                <span className="badge">{selectedExercise.difficulty}</span>
                <span className="badge">{selectedExercise.duration}</span>
              </div>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h3>
                  <FiInfo className="section-icon" />
                  Description
                </h3>
                <p>{selectedExercise.description}</p>
              </div>

              <div className="detail-section">
                <h3>
                  <FiActivity className="section-icon" />
                  Instructions
                </h3>
                <ol className="instructions-list">
                  {selectedExercise.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="detail-section">
                <h3>
                  <FiStar className="section-icon" />
                  Benefits
                </h3>
                <ul className="benefits-list">
                  {selectedExercise.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>
                  <BiDumbbell className="section-icon" />
                  Pro Tips
                </h3>
                <ul className="tips-list">
                  {selectedExercise.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <button className="start-exercise-btn">
                <FiPlay /> Start Exercise
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}