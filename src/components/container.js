import './styles.css';
import Header from './Header';
import SearchWithSuggestions from './searchsuggestions';

const Container = () => {
    return (
        <div className="parent-container">
           <Header />
           <SearchWithSuggestions />
        </div>
    );
};

export default Container;