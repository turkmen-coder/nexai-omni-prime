import { PromptCategory, PromptTechnique } from './types';

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    name: "promptCategories.contentCreation.name",
    templates: [
      { name: "promptTemplates.seoBlog.name", description: "promptTemplates.seoBlog.description", icon: "📄", prompt: { role: "promptTemplates.seoBlog.prompt.role", task: "promptTemplates.seoBlog.prompt.task", context: "promptTemplates.seoBlog.prompt.context", tone: "promptTemplates.seoBlog.prompt.tone", format: "promptTemplates.seoBlog.prompt.format" }, contextExamples: ["promptTemplates.seoBlog.contextExamples.0", "promptTemplates.seoBlog.contextExamples.1", "promptTemplates.seoBlog.contextExamples.2"], toneExamples: ["promptTemplates.seoBlog.toneExamples.0", "promptTemplates.seoBlog.toneExamples.1", "promptTemplates.seoBlog.toneExamples.2"], formatExamples: ["promptTemplates.seoBlog.formatExamples.0", "promptTemplates.seoBlog.formatExamples.1", "promptTemplates.seoBlog.formatExamples.2"] },
      { name: "promptTemplates.socialMediaPost.name", description: "promptTemplates.socialMediaPost.description", icon: "📱", prompt: { role: "promptTemplates.socialMediaPost.prompt.role", task: "promptTemplates.socialMediaPost.prompt.task", context: "promptTemplates.socialMediaPost.prompt.context", tone: "promptTemplates.socialMediaPost.prompt.tone", format: "promptTemplates.socialMediaPost.prompt.format" }, contextExamples: ["promptTemplates.socialMediaPost.contextExamples.0", "promptTemplates.socialMediaPost.contextExamples.1", "promptTemplates.socialMediaPost.contextExamples.2"], toneExamples: ["promptTemplates.socialMediaPost.toneExamples.0", "promptTemplates.socialMediaPost.toneExamples.1", "promptTemplates.socialMediaPost.toneExamples.2"], formatExamples: ["promptTemplates.socialMediaPost.formatExamples.0", "promptTemplates.socialMediaPost.formatExamples.1", "promptTemplates.socialMediaPost.formatExamples.2"] },
    ]
  },
  {
      name: "promptCategories.textLanguage.name",
      templates: [
          { name: "promptTemplates.summarization.name", description: "promptTemplates.summarization.description", icon: "📑", prompt: { role: "promptTemplates.summarization.prompt.role", task: "promptTemplates.summarization.prompt.task", context: "{text_to_summarize}", tone: "promptTemplates.summarization.prompt.tone", format: "promptTemplates.summarization.prompt.format" } },
          { name: "promptTemplates.translation.name", description: "promptTemplates.translation.description", icon: "🌐", prompt: { role: "promptTemplates.translation.prompt.role", task: "promptTemplates.translation.prompt.task", context: "{text_to_translate}", tone: "promptTemplates.translation.prompt.tone", format: "promptTemplates.translation.prompt.format" } },
          { name: "promptTemplates.toneChange.name", description: "promptTemplates.toneChange.description", icon: "🎭", prompt: { role: "promptTemplates.toneChange.prompt.role", task: "promptTemplates.toneChange.prompt.task", context: "{text_to_rewrite}", tone: "promptTemplates.toneChange.prompt.tone", format: "promptTemplates.toneChange.prompt.format" } },
          { name: "promptTemplates.textExpansion.name", description: "promptTemplates.textExpansion.description", icon: " expansin", prompt: { role: "promptTemplates.textExpansion.prompt.role", task: "promptTemplates.textExpansion.prompt.task", context: "{sentence_to_expand}", tone: "promptTemplates.textExpansion.prompt.tone", format: "promptTemplates.textExpansion.prompt.format" } },
          { name: "promptTemplates.grammarFix.name", description: "promptTemplates.grammarFix.description", icon: "✍️", prompt: { role: "promptTemplates.grammarFix.prompt.role", task: "promptTemplates.grammarFix.prompt.task", context: "{text_with_errors}", tone: "promptTemplates.grammarFix.prompt.tone", format: "promptTemplates.grammarFix.prompt.format" } },
      ]
  },
  {
      name: "promptCategories.imageGeneration.name",
      templates: [
          { name: "promptTemplates.photoGeneration.name", description: "promptTemplates.photoGeneration.description", icon: "🖼️", prompt: { role: "promptTemplates.photoGeneration.prompt.role", task: "promptTemplates.photoGeneration.prompt.task", context: "promptTemplates.photoGeneration.prompt.context", tone: "promptTemplates.photoGeneration.prompt.tone", format: "promptTemplates.photoGeneration.prompt.format" } },
          { name: "promptTemplates.logoDesign.name", description: "promptTemplates.logoDesign.description", icon: "🎨", prompt: { role: "promptTemplates.logoDesign.prompt.role", task: "promptTemplates.logoDesign.prompt.task", context: "promptTemplates.logoDesign.prompt.context", tone: "promptTemplates.logoDesign.prompt.tone", format: "promptTemplates.logoDesign.prompt.format" } },
          { name: "promptTemplates.characterIllustration.name", description: "promptTemplates.characterIllustration.description", icon: "🧑‍🎤", prompt: { role: "promptTemplates.characterIllustration.prompt.role", task: "promptTemplates.characterIllustration.prompt.task", context: "promptTemplates.characterIllustration.prompt.context", tone: "promptTemplates.characterIllustration.prompt.tone", format: "promptTemplates.characterIllustration.prompt.format" } },
          { name: "promptTemplates.productImage.name", description: "promptTemplates.productImage.description", icon: "🛍️", prompt: { role: "promptTemplates.productImage.prompt.role", task: "promptTemplates.productImage.prompt.task", context: "promptTemplates.productImage.prompt.context", tone: "promptTemplates.productImage.prompt.tone", format: "promptTemplates.productImage.prompt.format" } },
          { name: "promptTemplates.landscapeCreation.name", description: "promptTemplates.landscapeCreation.description", icon: "🏞️", prompt: { role: "promptTemplates.landscapeCreation.prompt.role", task: "promptTemplates.landscapeCreation.prompt.task", context: "promptTemplates.landscapeCreation.prompt.context", tone: "promptTemplates.landscapeCreation.prompt.tone", format: "promptTemplates.landscapeCreation.prompt.format" } },
          { name: "promptTemplates.fantasyIllustration.name", description: "promptTemplates.fantasyIllustration.description", icon: "🐉", prompt: { role: "promptTemplates.fantasyIllustration.prompt.role", task: "promptTemplates.fantasyIllustration.prompt.task", context: "promptTemplates.fantasyIllustration.prompt.context", tone: "promptTemplates.fantasyIllustration.prompt.tone", format: "promptTemplates.fantasyIllustration.prompt.format" } },
          { name: "promptTemplates.photorealisticProduct.name", description: "promptTemplates.photorealisticProduct.description", icon: "👟", prompt: { role: "promptTemplates.photorealisticProduct.prompt.role", task: "promptTemplates.photorealisticProduct.prompt.task", context: "promptTemplates.photorealisticProduct.prompt.context", tone: "promptTemplates.photorealisticProduct.prompt.tone", format: "promptTemplates.photorealisticProduct.prompt.format" } },
          { name: "promptTemplates.architecturalVisualization.name", description: "promptTemplates.architecturalVisualization.description", icon: "🏰", prompt: { role: "promptTemplates.architecturalVisualization.prompt.role", task: "promptTemplates.architecturalVisualization.prompt.task", context: "promptTemplates.architecturalVisualization.prompt.context", tone: "promptTemplates.architecturalVisualization.prompt.tone", format: "promptTemplates.architecturalVisualization.prompt.format" } },
      ]
  },
  {
      name: "promptCategories.video.name",
      templates: [
          { name: "promptTemplates.fpvDronePursuit.name", description: "promptTemplates.fpvDronePursuit.description", icon: "📹", prompt: { role: "promptTemplates.fpvDronePursuit.prompt.role", task: "promptTemplates.fpvDronePursuit.prompt.task", context: "promptTemplates.fpvDronePursuit.prompt.context", tone: "promptTemplates.fpvDronePursuit.prompt.tone", format: "promptTemplates.fpvDronePursuit.prompt.format" } },
          { name: "promptTemplates.slowMotionCinematic.name", description: "promptTemplates.slowMotionCinematic.description", icon: "🐋", prompt: { role: "promptTemplates.slowMotionCinematic.prompt.role", task: "promptTemplates.slowMotionCinematic.prompt.task", context: "promptTemplates.slowMotionCinematic.prompt.context", tone: "promptTemplates.slowMotionCinematic.prompt.tone", format: "promptTemplates.slowMotionCinematic.prompt.format" } },
          { name: "promptTemplates.wingsuitFlight.name", description: "promptTemplates.wingsuitFlight.description", icon: "🪂", prompt: { role: "promptTemplates.wingsuitFlight.prompt.role", task: "promptTemplates.wingsuitFlight.prompt.task", context: "promptTemplates.wingsuitFlight.prompt.context", tone: "promptTemplates.wingsuitFlight.prompt.tone", format: "promptTemplates.wingsuitFlight.prompt.format" } },
          { name: "promptTemplates.lowAngleMotorbike.name", description: "promptTemplates.lowAngleMotorbike.description", icon: "🏍️", prompt: { role: "promptTemplates.lowAngleMotorbike.prompt.role", task: "promptTemplates.lowAngleMotorbike.prompt.task", context: "promptTemplates.lowAngleMotorbike.prompt.context", tone: "promptTemplates.lowAngleMotorbike.prompt.tone", format: "promptTemplates.lowAngleMotorbike.prompt.format" } },
          { name: "promptTemplates.slowZoomSorceress.name", description: "promptTemplates.slowZoomSorceress.description", icon: "🧙‍♀️", prompt: { role: "promptTemplates.slowZoomSorceress.prompt.role", task: "promptTemplates.slowZoomSorceress.prompt.task", context: "promptTemplates.slowZoomSorceress.prompt.context", tone: "promptTemplates.slowZoomSorceress.prompt.tone", format: "promptTemplates.slowZoomSorceress.prompt.format" } },
          { name: "promptTemplates.360SpinSoldier.name", description: "promptTemplates.360SpinSoldier.description", icon: "🤖", prompt: { role: "promptTemplates.360SpinSoldier.prompt.role", task: "promptTemplates.360SpinSoldier.prompt.task", context: "promptTemplates.360SpinSoldier.prompt.context", tone: "promptTemplates.360SpinSoldier.prompt.tone", format: "promptTemplates.360SpinSoldier.prompt.format" } },
      ]
  },
  {
    name: "promptCategories.business.name",
    templates: [
      { name: "promptTemplates.swotAnalysis.name", description: "promptTemplates.swotAnalysis.description", icon: "📈", prompt: { role: "promptTemplates.swotAnalysis.prompt.role", task: "promptTemplates.swotAnalysis.prompt.task", context: "promptTemplates.swotAnalysis.prompt.context", tone: "promptTemplates.swotAnalysis.prompt.tone", format: "promptTemplates.swotAnalysis.prompt.format" }, contextExamples: ["promptTemplates.swotAnalysis.contextExamples.0", "promptTemplates.swotAnalysis.contextExamples.1", "promptTemplates.swotAnalysis.contextExamples.2"], toneExamples: ["promptTemplates.swotAnalysis.toneExamples.0", "promptTemplates.swotAnalysis.toneExamples.1", "promptTemplates.swotAnalysis.toneExamples.2"], formatExamples: ["promptTemplates.swotAnalysis.formatExamples.0", "promptTemplates.swotAnalysis.formatExamples.1", "promptTemplates.swotAnalysis.formatExamples.2"] },
      { name: "promptTemplates.expertConsultant.name", description: "promptTemplates.expertConsultant.description", icon: "💡", prompt: { role: "promptTemplates.expertConsultant.prompt.role", task: "promptTemplates.expertConsultant.prompt.task", context: "promptTemplates.expertConsultant.prompt.context", tone: "promptTemplates.expertConsultant.prompt.tone", format: "promptTemplates.expertConsultant.prompt.format" }, contextExamples: ["promptTemplates.expertConsultant.contextExamples.0", "promptTemplates.expertConsultant.contextExamples.1", "promptTemplates.expertConsultant.contextExamples.2"], toneExamples: ["promptTemplates.expertConsultant.toneExamples.0", "promptTemplates.expertConsultant.toneExamples.1", "promptTemplates.expertConsultant.toneExamples.2"], formatExamples: ["promptTemplates.expertConsultant.formatExamples.0", "promptTemplates.expertConsultant.formatExamples.1", "promptTemplates.expertConsultant.formatExamples.2"] },
      { name: "promptTemplates.emailWriting.name", description: "promptTemplates.emailWriting.description", icon: "✉️", prompt: { role: "promptTemplates.emailWriting.prompt.role", task: "promptTemplates.emailWriting.prompt.task", context: "promptTemplates.emailWriting.prompt.context", tone: "promptTemplates.emailWriting.prompt.tone", format: "promptTemplates.emailWriting.prompt.format" } },
      { name: "promptTemplates.productDescription.name", description: "promptTemplates.productDescription.description", icon: "📝", prompt: { role: "promptTemplates.productDescription.prompt.role", task: "promptTemplates.productDescription.prompt.task", context: "promptTemplates.productDescription.prompt.context", tone: "promptTemplates.productDescription.prompt.tone", format: "promptTemplates.productDescription.prompt.format" } },
      { name: "promptTemplates.businessPlan.name", description: "promptTemplates.businessPlan.description", icon: "📄", prompt: { role: "promptTemplates.businessPlan.prompt.role", task: "promptTemplates.businessPlan.prompt.task", context: "promptTemplates.businessPlan.prompt.context", tone: "promptTemplates.businessPlan.prompt.tone", format: "promptTemplates.businessPlan.prompt.format" } },
    ]
  },
    {
    name: "promptCategories.rolePlaying.name",
    templates: [
      { name: "promptTemplates.actAsInterviewer.name", description: "promptTemplates.actAsInterviewer.description", icon: "💼", prompt: { role: "promptTemplates.actAsInterviewer.prompt.role", task: "promptTemplates.actAsInterviewer.prompt.task", context: "promptTemplates.actAsInterviewer.prompt.context", tone: "promptTemplates.actAsInterviewer.prompt.tone", format: "promptTemplates.actAsInterviewer.prompt.format" } },
      { name: "promptTemplates.actAsStoryteller.name", description: "promptTemplates.actAsStoryteller.description", icon: "📖", prompt: { role: "promptTemplates.actAsStoryteller.prompt.role", task: "promptTemplates.actAsStoryteller.prompt.task", context: "promptTemplates.actAsStoryteller.prompt.context", tone: "promptTemplates.actAsStoryteller.prompt.tone", format: "promptTemplates.actAsStoryteller.prompt.format" } },
      { name: "promptTemplates.actAsComedian.name", description: "promptTemplates.actAsComedian.description", icon: "😂", prompt: { role: "promptTemplates.actAsComedian.prompt.role", task: "promptTemplates.actAsComedian.prompt.task", context: "promptTemplates.actAsComedian.prompt.context", tone: "promptTemplates.actAsComedian.prompt.tone", format: "promptTemplates.actAsComedian.prompt.format" } },
      { name: "promptTemplates.actAsLifeCoach.name", description: "promptTemplates.actAsLifeCoach.description", icon: "🧘‍♂️", prompt: { role: "promptTemplates.actAsLifeCoach.prompt.role", task: "promptTemplates.actAsLifeCoach.prompt.task", context: "promptTemplates.actAsLifeCoach.prompt.context", tone: "promptTemplates.actAsLifeCoach.prompt.tone", format: "promptTemplates.actAsLifeCoach.prompt.format" } },
      { name: "promptTemplates.actAsTechReviewer.name", description: "promptTemplates.actAsTechReviewer.description", icon: "💻", prompt: { role: "promptTemplates.actAsTechReviewer.prompt.role", task: "promptTemplates.actAsTechReviewer.prompt.task", context: "promptTemplates.actAsTechReviewer.prompt.context", tone: "promptTemplates.actAsTechReviewer.prompt.tone", format: "promptTemplates.actAsTechReviewer.prompt.format" } },
    ]
  },
  {
    name: "promptCategories.technical.name",
    templates: [
      { name: "promptTemplates.codeGenerator.name", description: "promptTemplates.codeGenerator.description", icon: "⚙️", prompt: { role: "promptTemplates.codeGenerator.prompt.role", task: "promptTemplates.codeGenerator.prompt.task", context: "promptTemplates.codeGenerator.prompt.context", tone: "promptTemplates.codeGenerator.prompt.tone", format: "promptTemplates.codeGenerator.prompt.format" }, contextExamples: ["promptTemplates.codeGenerator.contextExamples.0", "promptTemplates.codeGenerator.contextExamples.1", "promptTemplates.codeGenerator.contextExamples.2"], toneExamples: ["promptTemplates.codeGenerator.toneExamples.0", "promptTemplates.codeGenerator.toneExamples.1", "promptTemplates.codeGenerator.toneExamples.2"], formatExamples: ["promptTemplates.codeGenerator.formatExamples.0", "promptTemplates.codeGenerator.formatExamples.1", "promptTemplates.codeGenerator.formatExamples.2"] },
      { name: "promptTemplates.apiDocs.name", description: "promptTemplates.apiDocs.description", icon: "📚", prompt: { role: "promptTemplates.apiDocs.prompt.role", task: "promptTemplates.apiDocs.prompt.task", context: "promptTemplates.apiDocs.prompt.context", tone: "promptTemplates.apiDocs.prompt.tone", format: "promptTemplates.apiDocs.prompt.format" }, contextExamples: ["promptTemplates.apiDocs.contextExamples.0", "promptTemplates.apiDocs.contextExamples.1", "promptTemplates.apiDocs.contextExamples.2"], toneExamples: ["promptTemplates.apiDocs.toneExamples.0", "promptTemplates.apiDocs.toneExamples.1", "promptTemplates.apiDocs.toneExamples.2"], formatExamples: ["promptTemplates.apiDocs.formatExamples.0", "promptTemplates.apiDocs.formatExamples.1", "promptTemplates.apiDocs.formatExamples.2"] },
      { name: "promptTemplates.bugReport.name", description: "promptTemplates.bugReport.description", icon: "🐞", prompt: { role: "promptTemplates.bugReport.prompt.role", task: "promptTemplates.bugReport.prompt.task", context: "promptTemplates.bugReport.prompt.context", tone: "promptTemplates.bugReport.prompt.tone", format: "promptTemplates.bugReport.prompt.format" }, contextExamples: ["promptTemplates.bugReport.contextExamples.0", "promptTemplates.bugReport.contextExamples.1", "promptTemplates.bugReport.contextExamples.2"], toneExamples: ["promptTemplates.bugReport.toneExamples.0", "promptTemplates.bugReport.toneExamples.1", "promptTemplates.bugReport.toneExamples.2"], formatExamples: ["promptTemplates.bugReport.formatExamples.0", "promptTemplates.bugReport.formatExamples.1", "promptTemplates.bugReport.formatExamples.2"] },
      { name: "promptTemplates.codeExplanation.name", description: "promptTemplates.codeExplanation.description", icon: "👨‍🏫", prompt: { role: "promptTemplates.codeExplanation.prompt.role", task: "promptTemplates.codeExplanation.prompt.task", context: "{code_snippet}", tone: "promptTemplates.codeExplanation.prompt.tone", format: "promptTemplates.codeExplanation.prompt.format" } },
      { name: "promptTemplates.codeDebugging.name", description: "promptTemplates.codeDebugging.description", icon: "🐛", prompt: { role: "promptTemplates.codeDebugging.prompt.role", task: "promptTemplates.codeDebugging.prompt.task", context: "{buggy_code}", tone: "promptTemplates.codeDebugging.prompt.tone", format: "promptTemplates.codeDebugging.prompt.format" } },
      { name: "promptTemplates.algorithmCreation.name", description: "promptTemplates.algorithmCreation.description", icon: "🧠", prompt: { role: "promptTemplates.algorithmCreation.prompt.role", task: "promptTemplates.algorithmCreation.prompt.task", context: "promptTemplates.algorithmCreation.prompt.context", tone: "promptTemplates.algorithmCreation.prompt.tone", format: "promptTemplates.algorithmCreation.prompt.format" } },
    ]
  },
  {
    name: "promptCategories.education.name",
    templates: [
      { name: "promptTemplates.lessonPlanner.name", description: "promptTemplates.lessonPlanner.description", icon: "🎓", prompt: { role: "promptTemplates.lessonPlanner.prompt.role", task: "promptTemplates.lessonPlanner.prompt.task", context: "promptTemplates.lessonPlanner.prompt.context", tone: "promptTemplates.lessonPlanner.prompt.tone", format: "promptTemplates.lessonPlanner.prompt.format" } },
      { name: "promptTemplates.quizGenerator.name", description: "promptTemplates.quizGenerator.description", icon: "❓", prompt: { role: "promptTemplates.quizGenerator.prompt.role", task: "promptTemplates.quizGenerator.prompt.task", context: "promptTemplates.quizGenerator.prompt.context", tone: "promptTemplates.quizGenerator.prompt.tone", format: "promptTemplates.quizGenerator.prompt.format" } },
      { name: "promptTemplates.conceptMap.name", description: "promptTemplates.conceptMap.description", icon: "🗺️", prompt: { role: "promptTemplates.conceptMap.prompt.role", task: "promptTemplates.conceptMap.prompt.task", context: "promptTemplates.conceptMap.prompt.context", tone: "promptTemplates.conceptMap.prompt.tone", format: "promptTemplates.conceptMap.prompt.format" } },
      { name: "promptTemplates.learningObjectives.name", description: "promptTemplates.learningObjectives.description", icon: "🎯", prompt: { role: "promptTemplates.learningObjectives.prompt.role", task: "promptTemplates.learningObjectives.prompt.task", context: "promptTemplates.learningObjectives.prompt.context", tone: "promptTemplates.learningObjectives.prompt.tone", format: "promptTemplates.learningObjectives.prompt.format" } },
      { name: "promptTemplates.resourceList.name", description: "promptTemplates.resourceList.description", icon: "📚", prompt: { role: "promptTemplates.resourceList.prompt.role", task: "promptTemplates.resourceList.prompt.task", context: "promptTemplates.resourceList.prompt.context", tone: "promptTemplates.resourceList.prompt.tone", format: "promptTemplates.resourceList.prompt.format" } },
    ]
  },
  {
    name: "promptCategories.creativeWriting.name",
    templates: [
      { name: "promptTemplates.characterCreator.name", description: "promptTemplates.characterCreator.description", icon: "👤", prompt: { role: "promptTemplates.characterCreator.prompt.role", task: "promptTemplates.characterCreator.prompt.task", context: "promptTemplates.characterCreator.prompt.context", tone: "promptTemplates.characterCreator.prompt.tone", format: "promptTemplates.characterCreator.prompt.format" } },
      { name: "promptTemplates.shortStory.name", description: "promptTemplates.shortStory.description", icon: "📖", prompt: { role: "promptTemplates.shortStory.prompt.role", task: "promptTemplates.shortStory.prompt.task", context: "promptTemplates.shortStory.prompt.context", tone: "promptTemplates.shortStory.prompt.tone", format: "promptTemplates.shortStory.prompt.format" } },
      { name: "promptTemplates.dialogueWriting.name", description: "promptTemplates.dialogueWriting.description", icon: "💬", prompt: { role: "promptTemplates.dialogueWriting.prompt.role", task: "promptTemplates.dialogueWriting.prompt.task", context: "promptTemplates.dialogueWriting.prompt.context", tone: "promptTemplates.dialogueWriting.prompt.tone", format: "promptTemplates.dialogueWriting.prompt.format" } },
      { name: "promptTemplates.poetry.name", description: "promptTemplates.poetry.description", icon: "📜", prompt: { role: "promptTemplates.poetry.prompt.role", task: "promptTemplates.poetry.prompt.task", context: "promptTemplates.poetry.prompt.context", tone: "promptTemplates.poetry.prompt.tone", format: "promptTemplates.poetry.prompt.format" } },
      { name: "promptTemplates.screenplay.name", description: "promptTemplates.screenplay.description", icon: "🎬", prompt: { role: "promptTemplates.screenplay.prompt.role", task: "promptTemplates.screenplay.prompt.task", context: "promptTemplates.screenplay.prompt.context", tone: "promptTemplates.screenplay.prompt.tone", format: "promptTemplates.screenplay.prompt.format" } },
    ]
  },
  {
      name: "promptCategories.research.name",
      templates: [
          { name: "promptTemplates.literatureScan.name", description: "promptTemplates.literatureScan.description", icon: "🔬", prompt: { role: "promptTemplates.literatureScan.prompt.role", task: "promptTemplates.literatureScan.prompt.task", context: "promptTemplates.literatureScan.prompt.context", tone: "promptTemplates.literatureScan.prompt.tone", format: "promptTemplates.literatureScan.prompt.format" } },
          { name: "promptTemplates.dataAnalysisPlan.name", description: "promptTemplates.dataAnalysisPlan.description", icon: "📊", prompt: { role: "promptTemplates.dataAnalysisPlan.prompt.role", task: "promptTemplates.dataAnalysisPlan.prompt.task", context: "promptTemplates.dataAnalysisPlan.prompt.context", tone: "promptTemplates.dataAnalysisPlan.prompt.tone", format: "promptTemplates.dataAnalysisPlan.prompt.format" } },
          { name: "promptTemplates.hypothesisGeneration.name", description: "promptTemplates.hypothesisGeneration.description", icon: "💡", prompt: { role: "promptTemplates.hypothesisGeneration.prompt.role", task: "promptTemplates.hypothesisGeneration.prompt.task", context: "promptTemplates.hypothesisGeneration.prompt.context", tone: "promptTemplates.hypothesisGeneration.prompt.tone", format: "promptTemplates.hypothesisGeneration.prompt.format" } },
          { name: "promptTemplates.trendAnalysis.name", description: "promptTemplates.trendAnalysis.description", icon: "📈", prompt: { role: "promptTemplates.trendAnalysis.prompt.role", task: "promptTemplates.trendAnalysis.prompt.task", context: "promptTemplates.trendAnalysis.prompt.context", tone: "promptTemplates.trendAnalysis.prompt.tone", format: "promptTemplates.trendAnalysis.prompt.format" } },
          { name: "promptTemplates.comparativeAnalysis.name", description: "promptTemplates.comparativeAnalysis.description", icon: "🆚", prompt: { role: "promptTemplates.comparativeAnalysis.prompt.role", task: "promptTemplates.comparativeAnalysis.prompt.task", context: "promptTemplates.comparativeAnalysis.prompt.context", tone: "promptTemplates.comparativeAnalysis.prompt.tone", format: "promptTemplates.comparativeAnalysis.prompt.format" } },
      ]
  },
  {
    name: "promptCategories.health.name",
    templates: [
      { name: "promptTemplates.dietPlan.name", description: "promptTemplates.dietPlan.description", icon: "🥗", prompt: { role: "promptTemplates.dietPlan.prompt.role", task: "promptTemplates.dietPlan.prompt.task", context: "promptTemplates.dietPlan.prompt.context", tone: "promptTemplates.dietPlan.prompt.tone", format: "promptTemplates.dietPlan.prompt.format" } },
      { name: "promptTemplates.workoutRoutine.name", description: "promptTemplates.workoutRoutine.description", icon: "🏋️", prompt: { role: "promptTemplates.workoutRoutine.prompt.role", task: "promptTemplates.workoutRoutine.prompt.task", context: "promptTemplates.workoutRoutine.prompt.context", tone: "promptTemplates.workoutRoutine.prompt.tone", format: "promptTemplates.workoutRoutine.prompt.format" } },
      { name: "promptTemplates.stressManagement.name", description: "promptTemplates.stressManagement.description", icon: "🧘", prompt: { role: "promptTemplates.stressManagement.prompt.role", task: "promptTemplates.stressManagement.prompt.task", context: "promptTemplates.stressManagement.prompt.context", tone: "promptTemplates.stressManagement.prompt.tone", format: "promptTemplates.stressManagement.prompt.format" } },
      { name: "promptTemplates.sleepHygiene.name", description: "promptTemplates.sleepHygiene.description", icon: "😴", prompt: { role: "promptTemplates.sleepHygiene.prompt.role", task: "promptTemplates.sleepHygiene.prompt.task", context: "promptTemplates.sleepHygiene.prompt.context", tone: "promptTemplates.sleepHygiene.prompt.tone", format: "promptTemplates.sleepHygiene.prompt.format" } },
      { name: "promptTemplates.healthRisk.name", description: "promptTemplates.healthRisk.description", icon: "🩺", prompt: { role: "promptTemplates.healthRisk.prompt.role", task: "promptTemplates.healthRisk.prompt.task", context: "promptTemplates.healthRisk.prompt.context", tone: "promptTemplates.healthRisk.prompt.tone", format: "promptTemplates.healthRisk.prompt.format" } },
    ]
  }
];


export const PROMPT_TECHNIQUES: PromptTechnique[] = [
  {
    name: "promptTechniques.cot.name",
    description: "promptTechniques.cot.description",
    icon: "🧠",
    template: "promptTechniques.cot.template",
    examplePrompt: { role: "a Logistics Planning Assistant", task: "to plan the most efficient route and transportation method for sending 1000 fragile vases from Istanbul to Ankara.", context: "The shipment must arrive within 3 days and insurance costs must be minimized. Weather forecasts and traffic data should be considered.", tone: "Analytical and detail-oriented.", format: "A step-by-step numbered plan. Justifications should be provided for each step." }
  },
  {
    name: "promptTechniques.tot.name",
    description: "promptTechniques.tot.description",
    icon: "🌳",
    template: "promptTechniques.tot.template",
    examplePrompt: { role: "a Strategy Consultant", task: "to propose three different growth strategies for a local coffee shop to compete with chain brands.", context: "The shop has a limited budget but a loyal customer base. Strategies should focus on marketing, product diversification, and customer experience.", tone: "Creative and strategic.", format: "An analysis report presenting each strategy with its potential outcomes and risks." }
  },
  {
    name: "promptTechniques.rag.name",
    description: "promptTechniques.rag.description",
    icon: "🔍",
    template: "promptTechniques.rag.template",
    examplePrompt: { role: "an Internal Policy Expert", task: "to answer a question based on the provided internal company documents.", context: "The question is 'What is the annual leave policy for employees with 2 years of service?' The answer must be extracted directly from the provided policy documents.", tone: "Factual and direct.", format: "A direct quote from the source document, followed by the source name." }
  },
  {
    name: "promptTechniques.selfConsistency.name",
    description: "promptTechniques.selfConsistency.description",
    icon: "🔁",
    template: "promptTechniques.selfConsistency.template",
    examplePrompt: { role: "a Math Problem Solver", task: "to solve a logic puzzle.", context: "There are 27 chickens in total across 3 coops. Each coop has an equal number of chickens. How many chickens are in one coop?", tone: "Logical and precise.", format: "Provide only the final numerical answer. The model will run this multiple times to find the most consistent result." }
  },
  {
    name: "promptTechniques.generatedKnowledge.name",
    description: "promptTechniques.generatedKnowledge.description",
    icon: "💡",
    template: "promptTechniques.generatedKnowledge.template",
    examplePrompt: { role: "a Technical Explainer", task: "to first explain what Blockchain is in technical terms, then simplify that explanation for a high school student.", context: "The explanation should be easy to understand.", tone: "Educational.", format: "Two distinct sections: 1. Technical Explanation, 2. Simplified Analogy." }
  },
  {
    name: "promptTechniques.selfCheck.name",
    description: "promptTechniques.selfCheck.description",
    icon: "🧐",
    template: "promptTechniques.selfCheck.template",
    examplePrompt: { role: "a Fact-Checker", task: "to analyze its own answer about a topic for potential biases or inaccuracies.", context: "The initial answer discusses a complex historical event.", tone: "Objective and self-critical.", format: "A final, revised paragraph that corrects any found issues." }
  },
   {
    name: "promptTechniques.fillInTheBlank.name",
    description: "promptTechniques.fillInTheBlank.description",
    icon: "✏️",
    template: "promptTechniques.fillInTheBlank.template",
    examplePrompt: { role: "an expert at creating prompts", task: "turn bullet points into a fill-in-the-blank format.", context: "I have $100,000 in savings, what should I invest in?", tone: "Concise and resourceful.", format: "A fill in the blank format." }
  },
  {
    name: "promptTechniques.perspective.name",
    description: "promptTechniques.perspective.description",
    icon: "👥",
    template: "promptTechniques.perspective.template",
    examplePrompt: { role: "a debate coach", task: "to write an argument about improving as a kickboxer.", context: "Consider the perspectives of a kickboxing coach and a human anatomy expert.", tone: "Comprehensive and nuanced.", format: "An argument for each perspective." }
  },
   {
    name: "promptTechniques.rgc.name",
    description: "promptTechniques.rgc.description",
    icon: "🎯",
    template: "promptTechniques.rgc.template",
    examplePrompt: { role: "an expert marketer", task: "to create 5 emails ending with a call to action.", context: "The emails are for my online audience of entrepreneurs.", tone: "Friendly and less than 200 words.", format: "5 separate emails." }
  },
];

export const CONTEXT_EXAMPLES: string[] = [
  "promptTemplates.expertConsultant.contextExamples.0",
  "promptTemplates.expertConsultant.contextExamples.1",
  "promptTemplates.expertConsultant.contextExamples.2",
  "promptTemplates.seoBlog.contextExamples.2"
];

export const TONE_EXAMPLES: string[] = [
  "promptTemplates.seoBlog.toneExamples.1",
  "promptTemplates.lessonPlanner.toneExamples.0",
  "promptTemplates.expertConsultant.toneExamples.1",
  "promptTemplates.seoBlog.toneExamples.2"
];

export const FORMAT_EXAMPLES: string[] = [
  "promptTemplates.codeGenerator.formatExamples.1",
  "promptBuilder.placeholders.format",
  "promptTemplates.apiDocs.formatExamples.1",
  "promptTemplates.seoBlog.formatExamples.0"
];