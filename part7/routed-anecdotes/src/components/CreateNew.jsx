/* eslint-disable react/prop-types */
import { useField } from "../hooks";
const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  // const [author, setAuthor] = useState("");
  // const [info, setInfo] = useState("");

  // 7.4 Simplify the anecdote creation form of your application with the useField
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };


  // 7.5  clear all the input fields
  const handleReset = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };


  // 7.6 my browser didn't give any warning about onReset
  //     to get rid of onReset we can use <input {...{...content, onReset=undefine}} /> 
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}
          />
        </div>
        <div>
          author
          <input {...author}
          />
        </div>
        <div>
          url for more info
          <input {...info}
          />
        </div>
        <button>create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  );
};

export default CreateNew;
