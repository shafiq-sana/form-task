import './App.css';

import { ChakraProvider } from '@chakra-ui/provider';
import FormFlow from './components/FormFlow';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <FormProvider>
          <FormFlow />
        </FormProvider>
      </div>
    </ChakraProvider>
  );
}

export default App;
