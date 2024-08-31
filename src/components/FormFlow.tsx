import { Box } from '@chakra-ui/layout'
import { SlideFade } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Title from './questions/Title'
import DOB from './questions/DOB'
import Performance from './questions/Performance'
import SourcesOfStress from './questions/SourcesOfStress'
import WorkLifeBalance from './questions/WorkLifeBalance'
import { stepAnimation, stepAnimationDuration } from '../lib/form-utils'

enum FormSteps {
  Title,
  DOB,
  Performance,
  SourcesOfStress,
  WorkLifeBalance
}

const FormFlow: FC = () => {
  const [displayContent, setDisplayContent] = useState(false)
  const [formStep, setFormStep] = useState<FormSteps>(FormSteps.Title)

  useEffect(() => {
    setTimeout(() => {
      setDisplayContent(true)
    }, stepAnimationDuration * 1000 + 50)
  }, [])

  const goToNextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const goToPrevStep = () => {
    if (formStep !== 0) {
      setFormStep((prev) => prev - 1)
    }
  }

  return displayContent ? (
    <Box
      id="form-flow"
      w="full"
      backgroundColor="#70576c"
      textColor="white"
    >
      <Box w="full" maxW='800px' px={0} mx="auto" >
        <SlideFade
          in={displayContent}
          offsetY="20px"
          transition={{ enter: { duration: stepAnimationDuration } }}
          style={{ width: '100%' }}
        >
          <Box position="relative" h="full" w="full">
            <AnimatePresence initial={false} mode="wait">
              {formStep === FormSteps.Title && (
                <motion.div {...stepAnimation} key="title">
                  <Title
                    onTitleSuccess={goToNextStep}
                    onPrevPage={goToPrevStep}
                  />
                </motion.div>
              )}
              {formStep === FormSteps.DOB && (
                <motion.div {...stepAnimation} key="dob">
                  <DOB
                    onDOBSuccess={goToNextStep}
                    onPrevPage={goToPrevStep}
                  />
                </motion.div>
              )}

              {formStep === FormSteps.Performance && (
                <motion.div {...stepAnimation} key="performance">
                  <Performance
                    onPerformanceSuccess={goToNextStep}
                    onPrevPage={goToPrevStep}
                  />
                </motion.div>
              )}

              {formStep === FormSteps.SourcesOfStress && (
                <motion.div {...stepAnimation} key="sourcesOfStress">
                  <SourcesOfStress
                    onSourcesOfStressSuccess={goToNextStep}
                    onPrevPage={goToPrevStep}
                  />
                </motion.div>
              )}

              {formStep === FormSteps.WorkLifeBalance && (
                <motion.div {...stepAnimation} key="workLifeBalance">
                  <WorkLifeBalance
                    onPrevPage={goToPrevStep}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </SlideFade>
      </Box>
    </Box>
  ) : null
}

export default FormFlow
