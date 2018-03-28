import React from 'react';
import { address } from '../address';

export const TextAreaProperty = props => {
  const change_handler = event => {
    console.log(props.model.name());

    return props.mutate(address.bySample(props.model, props.form), {
      name: event.target.value,
    });
  };
  return (
    <div>
      <h1>Text Input Properties</h1>
      <p>{props.model.UUID()}</p>
      <label for="name">
                        <span>Name: </span>
      </label>
                   {' '}
      <input
        type="text"
        id="name"
        name="username"
        onChange={change_handler}
        value={props.model.name()}
      />
      <div>
        <div>
          <div />
        </div>
        <div />
        <div>
          <input type="text" name="FormTextArea-prepend" size="1" />
          <div />
        </div>
        <div>
          <input type="text" name="FormTextArea-promptPreWidth" size="1" />
          <div />
        </div>
        <div>
          <input type="text" name="FormTextArea-inputWidth" size="1" />
          <div />
        </div>
        <div>
          <input type="text" name="FormTextArea-promptPostWidth" size="1" />
          <div />
        </div>
        <div>
          <input type="text" name="FormTextArea-append" size="1" />
          <div />
        </div>
        <div />
        <div>
          <p>
            <label for="FormTextArea-prompt_pre">Field Prompt (optional)</label>
            <br />
            <textarea name="FormTextArea-prompt_pre" />
          </p>
          <p>
            <label for="FormTextArea-prompt_post">
              Post Field Prompt (optional)
            </label>
            <br />
            <textarea name="FormTextArea-prompt_post" />
          </p>
          <p>
            <label for="FormTextArea-qbq">Q-by-Q (optional)</label>
            <br />
            <textarea name="FormTextArea-qbq" />
          </p>
        </div>

        <p>
          <label for="FormTextArea-externalIdentifier">Field Identifier</label>
          <br />
          <input type="text" name="FormTextArea-externalIdentifier" />
        </p>
        <p>
          <label for="FormTextArea-name">Field Name</label>
          <br />
          <input type="text" name="FormTextArea-name" />
        </p>
        <p>
          <label for="FormTextArea-tabOrder">Tab Order</label>
          <br />
          <input
            type="text"
            name="FormTextArea-tabOrder"
            size="2"
            disabled="disabled"
          />
        </p>
        <p>
          <label for="FormTextArea-sasCodeLabel">Field Label</label>
          <br />
          <input type="text" name="FormTextArea-sasCodeLabel" />
          <br />
        </p>
        <p>
          <input type="checkbox" name="FormTextArea-autotab" />
          <label for="FormTextArea-autotab">Enable auto-tabbing</label>
        </p>
        <p>
          <a>Dependencies</a>
          <br />
          <br />
        </p>
        <input type="hidden" name="FormTextArea-cloneId" />
        <p>
          <label for="FormTextArea-sizeRows">Height</label>
          <br />
          <select name="FormTextArea-sizeRows">
            <option value="1">1</option>

            <option value="2">2</option>

            <option value="3">3</option>

            <option value="4">4</option>

            <option value="5">5</option>

            <option value="6">6</option>

            <option value="7">7</option>

            <option value="8">8</option>

            <option value="9">9</option>

            <option value="10">10</option>

            <option value="11">11</option>

            <option value="12">12</option>

            <option value="13">13</option>

            <option value="14">14</option>

            <option value="15">15</option>

            <option value="16">16</option>

            <option value="17">17</option>

            <option value="18">18</option>

            <option value="19">19</option>

            <option value="20">20</option>

            <option value="21">21</option>

            <option value="22">22</option>

            <option value="23">23</option>

            <option value="24">24</option>

            <option value="25">25</option>

            <option value="26">26</option>

            <option value="27">27</option>

            <option value="28">28</option>

            <option value="29">29</option>

            <option value="30">30</option>

            <option value="31">31</option>

            <option value="32">32</option>

            <option value="33">33</option>

            <option value="34">34</option>

            <option value="35">35</option>

            <option value="36">36</option>

            <option value="37">37</option>

            <option value="38">38</option>

            <option value="39">39</option>

            <option value="40">40</option>

            <option value="41">41</option>

            <option value="42">42</option>

            <option value="43">43</option>

            <option value="44">44</option>

            <option value="45">45</option>

            <option value="46">46</option>

            <option value="47">47</option>

            <option value="48">48</option>

            <option value="49">49</option>

            <option value="50">50</option>
          </select>
        </p>
      </div>
    </div>
  );
};
