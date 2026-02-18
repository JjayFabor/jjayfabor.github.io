/**
 * Static weekly blog data — The Weekly Chronicle template.
 * Edit this file to update the masthead and sections.
 * Section types: article (byline, body, optional image/pull quote), highlights (category list),
 * subsection (title + short entries), block (title + body + optional pull quote).
 */
export const blogData = {
  mastheadTitle: "THE WEEKLY CHRONICLE",
  tagline: "Your Personal Week in Review",
  mastheadDate: "Week of May 3-10, 2025",
  volumeIssue: "Volume 1, Issue 1",
  author: "Jjay Fabor",
  sections: [
    {
      type: "article",
      id: "major-milestone",
      title: "Major Milestone Achieved at Work",
      bylineDate: "Monday, May 5, 2025",
      body: [
        "In what could be described as a pivotal moment in our professional journey, this week marked the successful completion of the quarterly project that has consumed much of our resources over the past three months. The presentation to senior management on Tuesday went exceptionally well, with key stakeholders expressing satisfaction with the delivered results.",
        "This achievement represents not just a professional victory, but a testament to the dedication and late nights invested in ensuring quality deliverables. The recognition received from the department head serves as validation of our strategic approach to problem-solving.",
      ],
      imagePlaceholder: "Project Milestone Photo",
    },
    {
      type: "article",
      id: "weekend-adventures",
      title: "Weekend Adventures Rejuvenate Spirits",
      bylineDate: "Saturday, May 9, 2025",
      body: [
        "Weekend activities proved to be the perfect antidote to a busy week, with outdoor adventures taking center stage. The hiking expedition to local trails provided much-needed connection with nature, while quality time with family strengthened bonds that work commitments sometimes challenge.",
      ],
    },
    {
      type: "highlights",
      id: "highlights",
      title: "This Week's Highlights",
      items: [
        { category: "Accomplishment", text: "Successfully completed Q2 project ahead of schedule" },
        { category: "Social", text: "Reconnected with college friend over coffee" },
        { category: "Health", text: "Maintained 5-day workout streak" },
        { category: "Learning", text: "Finished online course on data visualization" },
        { category: "Personal", text: "Started reading \"The Midnight Library\"" },
      ],
    },
    {
      type: "subsection",
      id: "home-family",
      title: "Home & Family",
      entries: [
        {
          title: "Kitchen Renovation Update",
          body: "The kitchen renovation project entered its third week with significant progress on cabinet installation. Despite a minor setback with delayed tile delivery, the project remains on track for completion by month's end.",
        },
        {
          title: "Family Game Night Revival",
          body: "Wednesday evening's board game session brought laughter and friendly competition back to our living room. \"Settlers of Catan\" proved once again why it's a household favorite, with heated negotiations lasting well past bedtime.",
        },
        {
          title: "Garden Update",
          body: "Spring planting continues with the addition of heirloom tomatoes and herbs. The mild weather has been favorable for growth, though increased watering schedules are now in effect.",
        },
      ],
    },
    {
      type: "article",
      id: "fitness-routine",
      title: "New Fitness Routine Yields Results",
      bylineDate: "Thursday, May 7, 2025",
      body: [
        "The recently adopted morning workout routine continues to show promising results. This week marked the fifth consecutive day of 6 AM gym sessions, with noticeable improvements in energy levels throughout the day. The combination of cardio and strength training appears to be the perfect balance for current fitness goals.",
        {
          pullQuote: {
            quote: "The hardest part is always getting started, but once you're in the gym, everything flows naturally.",
            attribution: "Morning Workout Revelation",
          },
        },
        "Nutrition tracking has also become more consistent, with meal prep Sundays proving instrumental in maintaining healthy eating habits during busy weekdays.",
      ],
    },
    {
      type: "subsection",
      id: "entertainment",
      title: "Entertainment & Culture",
      entries: [
        {
          title: "Movie Night: \"Dune\" Sequel",
          body: "Friday's home cinema experience featured the highly anticipated sequel, delivering on both visual spectacle and narrative depth. The home theater system proved its worth with immersive sound design.",
        },
        {
          title: "New Restaurant Discovery",
          body: "\"Harmony Kitchen\" exceeded expectations with its innovative fusion menu. The tasting menu's creative combinations of flavors earned it a spot on our regular rotation list.",
        },
        {
          title: "Concert Review",
          body: "Sunday's outdoor concert at the park provided the perfect end to the week. The acoustic performance showcased local talent while offering a relaxed atmosphere.",
        },
      ],
    },
    {
      type: "block",
      id: "looking-ahead",
      title: "Looking Ahead",
      subtitle: "Next Week's Agenda",
      body: [
        "The upcoming week promises to be equally eventful with several key commitments on the horizon. Monday brings the monthly team meeting where project outcomes will be discussed in detail. Wednesday features a dental check-up, while Friday evening is reserved for the long-awaited dinner party with friends.",
        "Professional development continues with the commencement of a new online certification course, expected to enhance skills in project management. Personal goals include maintaining the established workout routine and dedicating time to the half-finished novel on the bedside table.",
      ],
      pullQuote: {
        quote: "Each week builds upon the last, creating a tapestry of experiences that define our year.",
        attribution: "Weekly Reflection",
      },
    },
  ],
};
