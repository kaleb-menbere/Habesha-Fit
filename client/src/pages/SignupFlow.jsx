import useSignupFlow from '../hooks/useSignupFlow';
import ProgressBar from '../components/ui/ProgressBar';
import Page1BasicInfo from '../components/auth/SignupFlow/Page1BasicInfo';
import Page2FitnessBackground from '../components/auth/SignupFlow/Page2FitnessBackground';
import Page3GoalsBodyType from '../components/auth/SignupFlow/Page3GoalsBodyType';
import Page4WelcomeGoal from '../components/auth/SignupFlow/Page4WelcomeGoal';

export default function SignupFlow() {
  const {
    currentPage,
    isLoading,
    page1Data,
    setPage1Data,
    page2Data,
    setPage2Data,
    page3Data,
    setPage3Data,
    weeklyGoal,
    setWeeklyGoal,
    preferredLanguage,
    setPreferredLanguage,
    savePage1,
    savePage2,
    savePage3,
    completeProfile
  } = useSignupFlow();

  const renderPage = () => {
    switch(currentPage) {
      case 1:
        return (
          <Page1BasicInfo
            data={page1Data}
            onUpdate={setPage1Data}
            onNext={savePage1}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <Page2FitnessBackground
            data={page2Data}
            onUpdate={setPage2Data}
            onNext={savePage2}
            onBack={() => setCurrentPage(1)}
            isLoading={isLoading}
          />
        );
      case 3:
        return (
          <Page3GoalsBodyType
            data={page3Data}
            onUpdate={setPage3Data}
            onNext={savePage3}
            onBack={() => setCurrentPage(2)}
            isLoading={isLoading}
          />
        );
      case 4:
        return (
          <Page4WelcomeGoal
            weeklyGoal={weeklyGoal}
            setWeeklyGoal={setWeeklyGoal}
            preferredLanguage={preferredLanguage}
            setPreferredLanguage={setPreferredLanguage}
            onComplete={completeProfile}
            onBack={() => setCurrentPage(3)}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-habesha-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
        <ProgressBar currentStep={currentPage} totalSteps={4} />
        {renderPage()}
      </div>
    </div>
  );
}